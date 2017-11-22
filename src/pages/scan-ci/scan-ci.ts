import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Importamos el plugin para Escanear Codigo QR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//Importamos Servicio Rest para validacion de Cedula de Identidad / CI
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
//importamos paginas a redireccionar
import { AprobacionPage } from "../aprobacion/aprobacion";
import { VerificacionPage } from "../verificacion/verificacion";

@IonicPage()
@Component({
  selector: 'page-scan-ci',
  templateUrl: 'scan-ci.html',
})
export class ScanCiPage {
  dataCI:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restService: RestServiceProvider, private barcodeScanner: BarcodeScanner) {
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.dataCI = barcodeData.text;
      if(this.dataCI){
        this.navCtrl.setRoot(AprobacionPage);
      }
    });
  }
  verificacionManual(){
    this.navCtrl.push(VerificacionPage);
  }

}