import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  slides:any[] = [
    {
      title: "Bienvenido!!!",
      description: "Esta <b>aplicación</b> nos ayudará a embarcar pasajeros de forma mas segura y eficiente! Corroborando información del tramo seleccionado, con la tarjeta de embarque del pasajero. Y para los(las) compatriotas, su  Cedula de identidad (Solo si posee código QR).",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "¿Que hace esta app?",
      description: "<b>Embarque de Pasajeros</b> Pone a disposición del operador, la elección del tramo con el que debe trabajar para proceder a embarcar a los pasajeros de ese tramo. Esto lo hace a travez de la de la camara del celular, que es usada como scanner de codigos QR (El cuadrado negro con puntos que se ve en la Tarjeta de Embarque). A su vez, nos provee la lista de pasajeros por embarcar, y nos permite saber si esa Tarjeta de Embarque corresponde al tramo seleccionado, si es una Tarjeta Valida, si corresponde al tramo seleccionado y los datos del pasajero.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    },
    {
      title: "¿Para que me sirve?",
      description: "Esta aplicación nos ayudará a corroborar la información de la Tarjeta de Embarque junto con los datos del pasajero, evitando así, falsificaciones, equivocaciones y posibles confusiones que podamos tener al momento de embarcar a un pasajero!",
      image: "assets/imgs/ica-slidebox-img-3.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menuCtrl: MenuController) {
  }

  saltar_ayuda(){
    this.navCtrl.pop();
  }

}
