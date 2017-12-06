import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//Importamos la Pagina a la que vamos a redireccionar
import { ViajesPage } from '../viajes/viajes';

@Component({
  selector: 'page-seleccion',
  templateUrl: 'seleccion.html',
})
export class SeleccionPage {

  usuario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController) {
    this.usuario = this.navParams.data;
  }

  abrirViajes():void{
    let loading = this.loadingCtrl.create({
    content: 'Cargando...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(ViajesPage);
    }, 1200);

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
}
