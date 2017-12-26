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
  tramo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
                this.tramo = this.navParams.data;
                console.log(this.tramo);

                //Reproducción de audio de rechazo al entrar a la página.
                let audio = new Audio();
                audio.src = "assets/audio/datos_incorrectos.mp3";
                audio.load();
                audio.play();
  }

  siguientePasajero(){
    this.navCtrl.setRoot(ScanQrPage, this.tramo);
  }

}
