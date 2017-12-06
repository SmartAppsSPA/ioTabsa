import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Importamos paginas a redireccionar
import { AprobacionPage } from "../aprobacion/aprobacion";
import { RechazoPage } from "../rechazo/rechazo";
//importamos plug in a utilizar
import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
})
export class VerificacionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private tts: TextToSpeech) {


                    this.tts.speak('Verifike con cuidado la informacion de el pasajero.')
                    .then(() => console.log('Success'))
                    .catch((reason: any) => console.log(reason));
  }

  datosIncorrectos(){
    this.navCtrl.setRoot(RechazoPage);
  }
  datosCorrectos(){
    this.navCtrl.setRoot(AprobacionPage);
  }

}
