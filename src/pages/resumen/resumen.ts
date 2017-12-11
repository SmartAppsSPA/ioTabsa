import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//Importamos Paginas a usar
import { ViajesPage } from "../viajes/viajes";
import { ScanQrPage } from "../scan-qr/scan-qr";


@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  tramo:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController) {
    this.tramo = this.navParams.data;
    console.log(this.tramo);
  }

  viajeCorrecto(){
    this.navCtrl.setRoot(ScanQrPage, this.tramo);
  }
  viajeIncorrecto(){
    this.presentLoading();
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Espere un momento...'
    });

    loading.present();

    setTimeout(() => {
    this.navCtrl.setRoot(ViajesPage);
    }, 1500);

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

}
