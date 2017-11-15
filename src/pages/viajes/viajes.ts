import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Pagina ResumenPage
import { ResumenPage } from "../resumen/resumen";

@Component({
  selector: 'page-viajes',
  templateUrl: 'viajes.html',
})
export class ViajesPage {
  Viaje = {};
  fechas:any[] = [

    {
      fecha: "15-11-2017"
    },
    {
      fecha: "16-11-2017"
    },
    {
      fecha: "17-11-2017"
    },
    {
      fecha: "18-11-2017"
    }
  ];
  origenes:any[] = [
    {
      origen: "Punta Arenas"
    },
    {
      origen: "Natales"
    }
  ];
  destinos:any[] = [
    {
      destino: "Pto. Williams"
    },
    {
      destino: "Porvenir"
    },
    {
      destino: "Isla Magdalena"
    }
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  infoViaje(fecha:any, origen:any, destino:any){
    this.navCtrl.push(ResumenPage, {fecha, origen, destino});
  }
}
