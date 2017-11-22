import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Importamos paginas a redireccionar
import { AprobacionPage } from "../aprobacion/aprobacion";
import { RechazoPage } from "../rechazo/rechazo";

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
})
export class VerificacionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  datosIncorrectos(){
    this.navCtrl.setRoot(RechazoPage);
  }
  datosCorrectos(){
    this.navCtrl.setRoot(AprobacionPage);
  }

}
