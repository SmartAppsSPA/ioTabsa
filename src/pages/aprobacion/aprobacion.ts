import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importamos paginas a redireccionar
import { ScanQrPage } from "../scan-qr/scan-qr";

@IonicPage()
@Component({
  selector: 'page-aprobacion',
  templateUrl: 'aprobacion.html',
})
export class AprobacionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  siguientePasajero(){
    this.navCtrl.setRoot(ScanQrPage);
  }

}
