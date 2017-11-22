import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Pagina ResumenPage
import { ResumenPage } from "../resumen/resumen";
//Importamos Servicios APIRest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";


@Component({
  selector: 'page-viajes',
  templateUrl: 'viajes.html',
})
export class ViajesPage {
  Viaje = {}; // Datos obtenidos del formulario de la página Viaje.html
  origenes:any[] = []; //objetos con ID y Nombre de Sito guardados en un Array
  destinos:any[] = []; //objetos con ID y Nombre de Sito guardados en un Array
  sitioSQL:any; //Data recibida por el servidor SQL


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restServices: RestServiceProvider) {
                this.getSitios();
  }

  infoViaje(fecha:any, origen:any, destino:any){
    this.navCtrl.push(ResumenPage, {fecha, origen, destino});
  }
  getSitios(){
    this.restServices.getSitios().then(data =>{
      this.sitioSQL = data;
      for (let i = 0; i < this.sitioSQL.recordset.length; i++) {
          this.destinos[i] = this.sitioSQL.recordset[i];
          this.origenes[i] = this.sitioSQL.recordset[i];
          // console.log(this.destinos[i]);
      }

    });
  }
}
