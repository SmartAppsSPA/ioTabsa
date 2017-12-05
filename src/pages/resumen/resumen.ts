import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Importamos Paginas a usar
import { ViajesPage } from "../viajes/viajes";
import { ScanQrPage } from "../scan-qr/scan-qr";


@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  tramo:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tramo = this.navParams.data;
    console.log(this.tramo);
  }

  viajeCorrecto(){
    this.navCtrl.push(ScanQrPage);
  }
  viajeIncorrecto(){
    this.navCtrl.setRoot(ViajesPage);
  }

}
