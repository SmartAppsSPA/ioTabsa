import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Importamos el plugin para Escanear Codigo QR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// Importamos Servicio Rest para validacion de codigo QR
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
// Importamos siguiente pantalla
import { RechazoPage } from "../rechazo/rechazo";
import { ScanCiPage } from "../scan-ci/scan-ci";



@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {
  camposTabsa:any;
  var:string = "100&211690&9&1-9&Juan&Test&1010&2017-11-10 14:00:00&5804"
  dataQR:string;
  public workoutProgress: string = '0' + '%';


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner, public restService: RestServiceProvider) {
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.dataQR = barcodeData.text;
      let splittedQR = this.dataQR.split("&");
      let splittedvar = this.var.split("&");
      if(JSON.stringify(splittedQR) == JSON.stringify(splittedvar)){
        this.navCtrl.setRoot(ScanCiPage);
      }
      else{
        this.navCtrl.setRoot(RechazoPage);
      }
    }, (err) => {
      console.log(err);
    });
  }
  updateProgress(val) {
   // Update percentage value where the above is a decimal
    this.workoutProgress = Math.min( (val * 100), 100) + '%';
  }
}
