import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Importamos Paginas a usar
import { ViajesPage } from "../viajes/viajes";
import { ScanQrPage } from "../scan-qr/scan-qr";


@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  Viaje:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.Viaje = this.navParams.data;
  }

  viajeCorrecto(){
    this.navCtrl.push(ScanQrPage);
  }
  viajeIncorrecto(){
    this.navCtrl.setRoot(ViajesPage);
  }

}
