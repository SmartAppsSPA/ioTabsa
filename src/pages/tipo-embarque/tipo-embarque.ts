import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScanQrPage } from "../scan-qr/scan-qr";
import { ScanQrVehiculosPage } from "../scan-qr-vehiculos/scan-qr-vehiculos";

@IonicPage()
@Component({
  selector: 'page-tipo-embarque',
  templateUrl: 'tipo-embarque.html',
})
export class TipoEmbarquePage {

  tramo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tramo = this.navParams.data;
    console.log(this.tramo);
  }

  escanearPersonasQR(){
    this.navCtrl.setRoot(ScanQrPage, this.tramo);

  }
  escanearVehiculosQR(){
    this.navCtrl.setRoot(ScanQrVehiculosPage, this.tramo);
  }

}
