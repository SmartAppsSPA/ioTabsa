import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importamos Pagina para seguir escaneando Pasajeros
import { ScanQrPage } from "../scan-qr/scan-qr";


@IonicPage()
@Component({
  selector: 'page-rechazo',
  templateUrl: 'rechazo.html',
})
export class RechazoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  siguientePasajero(){
    this.navCtrl.setRoot(ScanQrPage);
  }

}
