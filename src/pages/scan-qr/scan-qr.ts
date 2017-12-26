import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
//Importamos el plugin para Escanear Codigo QR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// Importamos Servicio Rest para validacion de codigo QR
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
// Importamos siguiente pantalla
import { RechazoPage } from "../rechazo/rechazo";
import { ScanCiPage } from "../scan-ci/scan-ci";
import { VerificacionPage } from "../verificacion/verificacion";



@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {
  tramo:any;

  data = {id_ticket:'', id_reserva:'', id_cruce:'', id_tramo:'', val_seed:''};
  dataQR:string;
  resultadoSQL:any ={ticket:'', resultado:''};
  public cantPasajeros:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner, public restService: RestServiceProvider,
              public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  scan(){
   this.barcodeScanner.scan().then((barcodeData) => {
    this.presentLoading();
    this.dataQR = barcodeData.text;
    console.log(this.dataQR);
    //  this.dataQR = '112233&218335&9&EJ3506599&Elzbieta&Jurkiewicz&3122017&2017-12-03 14:00:00&5891&1975-05-09&186106178';
    // this.dataQR = '347&221045&9&18748063-9&Daniela&Ibarra&20171213&2017-12-19 14:00:00&5901&1994-02-19&1288017151&151';
    let splittedQR = this.dataQR.split("&");
     this.data = {id_ticket:splittedQR[0], id_reserva:splittedQR[1], id_cruce:splittedQR[8], id_tramo:splittedQR[2], val_seed:splittedQR[10]};
     // Guardamos la nacionalidad, para discriminar a que Pagina sera redireccionado el pasajero (Chileno = ScanCI / Extranjero = Verificacion Manual)
     let nacionalidadQR = splittedQR[11];
      console.log(this.data);
      this.restService.postValTicket(this.data).then(dataSP =>{

        if(dataSP['name'] === 'HttpErrorResponse'){
          this.presentToast();
          console.log("Existe error");
        }
        else{
          this.resultadoSQL = dataSP[0];
          console.log(this.resultadoSQL)
          //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque
          let fecha = this.navParams.data.cruce.horario_cruce.split("T");

          let fechaQRsplit = splittedQR[7].split(" ");
          let fechaQR = fechaQRsplit[0]
          console.log(fechaQR)
          console.log(fecha)
          // Primero verificamos si el pasajero es Chileno o Extranjero
          if(nacionalidadQR == "152"){
            if(this.resultadoSQL.resultado == 8 && fechaQR == fecha[0]){
               this.navCtrl.setRoot(ScanCiPage, {dataQR:splittedQR, tramo:this.tramo});
             }
            else{
              this.navCtrl.setRoot(RechazoPage, this.tramo);
            }
          }
          else{
            if(this.resultadoSQL.resultado == 8 && fechaQR == fecha[0]){
              this.navCtrl.setRoot(VerificacionPage, {dataQR:splittedQR, tramo:this.tramo});
            }
            else{
              this.navCtrl.setRoot(RechazoPage, this.tramo);
            }
          }
        }
      });
    }, (err) => {
      console.log(err);
    });
  }
  ionViewWillEnter(){
    this.tramo = this.navParams.data;
    // localStorage.setItem("cruce", JSON.stringify(this.tramo.cruce));

    console.log(this.tramo);
    let id_cruce_tramo:any = {id_cruce:this.tramo.cruce.id_cruce, id_tramo:this.tramo.cruce.id_tramo};
    this.restService.postCantPasajeros(id_cruce_tramo).then(dataSP =>{
      let resultado = dataSP[0].pasajeros;
      this.cantPasajeros = resultado + ' de ' + this.tramo.cruce.cupo_pasajeros_maximo;
      console.log(this.cantPasajeros)
    });
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Validando Ticket...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1850);

  }
  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'ERROR: El ticket del pasajero presenta problemas en el código QR. Verifique la Tarjeta de Embarque cuidadosamente.',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }
}
