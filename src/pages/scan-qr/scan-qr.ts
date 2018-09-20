import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events, Content, Platform } from 'ionic-angular';
//Importamos el plugin para Escanear Codigo QR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// Importamos Servicio Rest para validacion de codigo QR
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
// Importamos siguiente pantalla
import { RechazoPage } from "../rechazo/rechazo";
import { AprobacionPage } from "../aprobacion/aprobacion";

//importamos el scanner nuevo de qr
import { CmbscannerProvider, Settings } from '../../providers/cmbscanner/cmbscanner';

declare var cmbScanner:any;


@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

  @ViewChild(Content) content: Content;
  scannerActive:string ="barcode";
  public removeBtn : boolean;
  public connected : boolean;
  private settings : Settings;
  triggerMode : string = "analytics";
  list_data : any[] = [];

  tramo:any;
  data = {tipo_ticket:'', id_ticket:'', id_reserva:'', id_cruce:'', id_tramo:'', val_seed:''};
  dataVehiculo = {tipo_ticket:'', id_ticket:'', id_reserva:'', id_cruce:'', id_tramo:'', id_vehiculo:'', patente:'', val_seed:''};
  dataQR:string;
  resultadoSQL:any ={ticket:'', resultado:''};
  public cantPasajeros:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner, public restService: RestServiceProvider,
              public loadingCtrl: LoadingController, private toastCtrl: ToastController, private zone: NgZone,
              public cmbScannerProvider: CmbscannerProvider, private platform: Platform, public events: Events) {

                //subscribe to events so we can update our model whenever the connectionState changes
                events.subscribe('connection:changed', (connectionState) => {
                  if(connectionState == 2){
                    this.zone.run(() => {
                      this.connected = true;
                    });
                  }
                  else{
                    this.zone.run(() => {
                      this.connected = false;
                    });
                  }
                });
                platform.ready().then(() => {
                  this.removeBtn = (this.list_data.length > 0) ? false : true;
                  this.cmbScannerProvider.config().then(data => {
                    this.settings= this.cmbScannerProvider.getSettings();
                      this.triggerMode = "crop";
                    this.list_data = data.list;
                    cmbScanner.setActiveStartScanningCallback(scannerState => {
                      if(scannerState){
                        this.zone.run(() => {
                          this.scannerActive = "power";
                        });
                      }
                      else{
                        this.zone.run(() => {
                          this.scannerActive = "barcode";
                        });
                      }
                    });
                    cmbScanner.setResultCallback( result => {
                        // Proceso de escaneo y validación de código QR
                        this.presentLoading();
                        this.dataQR = result.readString;
                        console.log(this.dataQR);
                         // this.dataQR = '112233&218335&9&EJ3506599&Elzbieta&Jurkiewicz&3122017&2017-12-03 14:00:00&5891&1975-05-09&186106178';
                        // this.dataQR = '1&347&221045&9&18748063-9&Daniela&Ibarra&20171213&2017-12-19 14:00:00&5901&1994-02-19&1288017151&151';
                        var splittedQR = this.dataQR.split("&");
                         //Si el TIPO_TICKET es igual a 1 quiere decir que es un ticket de persona, así mismo si es 4 un ticket de vehículo
                         if(splittedQR[0] == '1'){
                         this.data = {tipo_ticket:splittedQR[0], id_ticket:splittedQR[1], id_reserva:splittedQR[2], id_cruce:splittedQR[9], id_tramo:splittedQR[3], val_seed:splittedQR[11]};
                         // Guardamos la nacionalidad, para discriminar a que Pagina sera redireccionado el pasajero (Chileno = ScanCI / Extranjero = Verificacion Manual)
                         var nacionalidadQR = splittedQR[12];
                          console.log(this.data);

                          if(this.cantPasajeros == 'Sin conexión'){
                            //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque

                            // Primero verificamos si el pasajero es Chileno o Extranjero
                            if(nacionalidadQR == "152"){
                              if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
                                 this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
                               }
                              else{
                                this.navCtrl.setRoot(RechazoPage, this.tramo);
                              }
                            }
                            if(nacionalidadQR != "152"){
                              if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
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

                                // Primero verificamos si el pasajero es Chileno o Extranjero
                                if(nacionalidadQR == "152"){
                                  if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
                                     this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
                                   }
                                  else{
                                    this.navCtrl.setRoot(RechazoPage, this.tramo);
                                  }
                                }
                                if(nacionalidadQR != "152"){
                                  if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
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
                       }
                       else if(splittedQR[0] == '4'){
                         this.dataVehiculo = {tipo_ticket:splittedQR[0], id_ticket:splittedQR[1], id_reserva:splittedQR[2], id_cruce:splittedQR[9], id_tramo:splittedQR[3], id_vehiculo:splittedQR[4], patente:splittedQR[5], val_seed:splittedQR[10]};
                         if(this.cantPasajeros == 'Sin conexión'){
                           //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque


                           if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
                             this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
                           }
                           else{
                             this.navCtrl.setRoot(RechazoPage, this.tramo);
                           }
                         }
                         else{
                           this.restService.postValTicketVehiculo(this.dataVehiculo).then(dataSP =>{
                             console.log(dataSP);
                             if(dataSP['name'] === 'HttpErrorResponse'){
                               this.presentToast();
                               console.log("Existe error");
                             }
                             else{
                               this.resultadoSQL = dataSP[0];
                               console.log(this.resultadoSQL);
                               //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque


                               if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
                                  this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
                                }
                                else{
                                  this.navCtrl.setRoot(RechazoPage, this.tramo);
                                }
                              }
                           });
                         }
                       }

                        this.zone.run(() => {
                          if(result.readString){
                          this.cmbScannerProvider.setResultItem(result);
                          this.list_data = this.cmbScannerProvider.data;
                          this.content.scrollToBottom();
                          }
                        });
                    });
                  });
                });
  }

  scan(){
   this.barcodeScanner.scan().then((barcodeData) => {



    }, (err) => {
      console.log(err);
    });
  }
  ionViewWillEnter(){


    cmbScanner.registerSDK("oHrl9VmG/SfX7gLccuwXtD+kmR55JoVxhlRfSIhnhvs=");


    this.cmbScannerProvider.cmbScanner.setTriggerType(2).then(result =>{
      //need to update buttons based on the trigger type
      if(result.status){
        this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
      }
    });

    this.platform.ready().then(() => {
      this.cmbScannerProvider.setSettingsItem('previewContainer',[0,0,100,80]);
      this.settings = this.cmbScannerProvider.getSettings();
    });

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
    }, 850);

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

  startStopScanner(event){
    this.cmbScannerProvider.cmbScanner.setTriggerType(2).then(result =>{
      //need to update buttons based on the trigger type
      if(result.status){
        this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
      }
    });
    if(this.scannerActive == 'barcode')
      this.cmbScannerProvider.start();
    else
      this.cmbScannerProvider.stop();
  }
  changeTriggerMode(){
    if(this.settings.triggerType == 5){
      this.cmbScannerProvider.cmbScanner.setTriggerType(2).then(result =>{
        //need to update buttons based on the trigger type
        if(result.status){
          this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
        }
      });
    }
    else{
      this.cmbScannerProvider.cmbScanner.setTriggerType(5).then(result =>{
        //need to update buttons based on the trigger type
        console.log(JSON.stringify(result));
        if(result.status){
          this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
            let toast = this.toastCtrl.create({
              message: 'Trigger mode changed to Continuous',
              duration: 2000,
              position: 'top'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
        }
      });
    }
  }
  ionViewDidEnter(){
    this.settings.triggerType = 2;
  }
}
