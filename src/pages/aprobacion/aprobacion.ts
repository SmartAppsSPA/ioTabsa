import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importamos paginas a redireccionar
import { ScanQrPage } from "../scan-qr/scan-qr";
import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage()
@Component({
  selector: 'page-aprobacion',
  templateUrl: 'aprobacion.html',
})
export class AprobacionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private tts: TextToSpeech) {
                this.tts.speak('Pasajero embarcado.')
                .then(() => console.log('Success'))
                .catch((reason: any) => console.log(reason));
  }

  siguientePasajero(){
    this.navCtrl.setRoot(ScanQrPage);
  }

}
