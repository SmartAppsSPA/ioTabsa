import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Importamos la Pagina a la que vamos a redireccionar
import { ViajesPage } from '../viajes/viajes';

@Component({
  selector: 'page-seleccion',
  templateUrl: 'seleccion.html',
})
export class SeleccionPage {

  usuario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = this.navParams.data;
  }

  abrirViajes():void{
    this.navCtrl.setRoot(ViajesPage);
  }
}
