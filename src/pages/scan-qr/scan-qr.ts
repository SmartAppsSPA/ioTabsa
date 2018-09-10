import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
//Importamos el plugin para Escanear Codigo QR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// Importamos Servicio Rest para validacion de codigo QR
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
// Importamos siguiente pantalla
import { RechazoPage } from "../rechazo/rechazo";
import { AprobacionPage } from "../aprobacion/aprobacion";
import { ScanCiPage } from "../scan-ci/scan-ci";
import { VerificacionPage } from "../verificacion/verificacion";



@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {
  tramo:any;

  data = {tipo_ticket:'', id_ticket:'', id_reserva:'', id_cruce:'', id_tramo:'', val_seed:''};
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
     // this.dataQR = '112233&218335&9&EJ3506599&Elzbieta&Jurkiewicz&3122017&2017-12-03 14:00:00&5891&1975-05-09&186106178';
    // this.dataQR = '1&347&221045&9&18748063-9&Daniela&Ibarra&20171213&2017-12-19 14:00:00&5901&1994-02-19&1288017151&151';
    var splittedQR = this.dataQR.split("&");
     this.data = {tipo_ticket:splittedQR[0], id_ticket:splittedQR[1], id_reserva:splittedQR[2], id_cruce:splittedQR[9], id_tramo:splittedQR[3], val_seed:splittedQR[11]};
     //Si el TIPO_TICKET es igual a 1 quiere decir que es un ticket de persona, así mismo si es 2 un ticket de vehículo
     if(splittedQR[0] == '1'){
   }
   else if(splittedQR[0] == '4'){

   }
     // Guardamos la nacionalidad, para discriminar a que Pagina sera redireccionado el pasajero (Chileno = ScanCI / Extranjero = Verificacion Manual)
     var nacionalidadQR = splittedQR[12];
      console.log(this.data);

      if(this.cantPasajeros == 'Sin conexión'){
        //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque
        let fecha = this.navParams.data.cruce.horario_cruce.split("T");

        let fechaQRsplit = splittedQR[8].split(" ");
        let fechaQR = fechaQRsplit[0]
        console.log(fechaQR)
        console.log(fecha)
        // Primero verificamos si el pasajero es Chileno o Extranjero
        if(nacionalidadQR == "152"){
          if(fechaQR == fecha[0] && this.tramo.cruce.id_tramo == this.data.id_tramo){
             this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
           }
          else{
            this.navCtrl.setRoot(RechazoPage, this.tramo);
          }
        }
        if(nacionalidadQR != "152"){
          if(fechaQR == fecha[0] && this.tramo.cruce.id_tramo == this.data.id_tramo){
            this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
          }
          else{
            this.navCtrl.setRoot(RechazoPage, this.tramo);
          }
        }
        if(nacionalidadQR == ""){
          this.navCtrl.setRoot(RechazoPage, this.tramo);
        }
      }

      else{
        //Validar que todos los datos del CODIGO QR existan y esten correctamente ingresados
        //Validar sean 12 parametros del codigo QR
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

            let fechaQRsplit = splittedQR[8].split(" ");
            let fechaQR = fechaQRsplit[0]
            console.log(fechaQR)
            console.log(fecha)
            // Primero verificamos si el pasajero es Chileno o Extranjero
            if(nacionalidadQR == "152"){
              if(this.resultadoSQL.resultado == 8 && fechaQR == fecha[0] && this.tramo.cruce.id_tramo == this.data.id_tramo){
                 this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
               }
              else{
                this.navCtrl.setRoot(RechazoPage, this.tramo);
              }
            }
            if(nacionalidadQR != "152"){
              if(this.resultadoSQL.resultado == 8 && fechaQR == fecha[0] && this.tramo.cruce.id_tramo == this.data.id_tramo){
                this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
              }
              else{
                this.navCtrl.setRoot(RechazoPage, this.tramo);
              }
            }
            if(nacionalidadQR == ''){
              this.navCtrl.setRoot(RechazoPage, this.tramo);
            }
          }
        });
      }

    }, (err) => {
      console.log(err);
    });
  }
  ionViewWillEnter(){
    this.tramo = this.navParams.data;
    console.log(this.tramo.cruce.id_tramo)
    // localStorage.setItem("cruce", JSON.stringify(this.tramo.cruce));

    console.log(this.tramo);
    let id_cruce_tramo:any = {id_cruce:this.tramo.cruce.id_cruce, id_tramo:this.tramo.cruce.id_tramo};
    this.restService.postCantPasajeros(id_cruce_tramo).then(dataSP =>{
      if(dataSP['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        this.cantPasajeros = "Sin conexión";
      }
      else{
        let resultado = dataSP[0].pasajeros;
        this.cantPasajeros = resultado + ' de ' + this.tramo.cruce.cupo_pasajeros_maximo;
        console.log(this.cantPasajeros)
      }

    });
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Validando Ticket...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 800);

  }
  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'ERROR DE CONEXIÓN: Verifique su conexión Wi-Fi.',
    duration: 2500,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }
}
