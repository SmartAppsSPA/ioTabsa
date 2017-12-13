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

  tramo:any;
  dataQR:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
          this.tramo = this.navParams.data.tramo;
          this.dataQR = this.navParams.data.dataQR;
  }

  datosIncorrectos(){
    this.navCtrl.setRoot(RechazoPage, this.tramo);
  }
  datosCorrectos(){
    this.navCtrl.setRoot(AprobacionPage, {dataQR:this.dataQR, tramo:this.tramo});
  }

}
