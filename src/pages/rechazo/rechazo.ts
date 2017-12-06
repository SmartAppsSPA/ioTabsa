import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importamos Pagina para seguir escaneando Pasajeros
import { ScanQrPage } from "../scan-qr/scan-qr";
import { TextToSpeech } from '@ionic-native/text-to-speech';



@IonicPage()
@Component({
  selector: 'page-rechazo',
  templateUrl: 'rechazo.html',
})
export class RechazoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private tts: TextToSpeech) {
                this.tts.speak('Datos incorrectos.')
                .then(() => console.log('Success'))
                .catch((reason: any) => console.log(reason));
  }

  siguientePasajero(){
    this.navCtrl.setRoot(ScanQrPage);
  }

}
