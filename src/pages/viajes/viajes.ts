import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  origenes:any[] = [{nombre_sitio: 'Punta Arenas'}, {nombre_sitio:'Porvenir'}, {nombre_sitio:'Puerto Williams'}, {nombre_sitio:'Punta Delgada'}, {nombre_sitio:'Bahía Azul'}, {nombre_sitio:'Río Verde'}, {nombre_sitio:'Ponsomby'},
                    {nombre_sitio:'Puerto Natales'}, {nombre_sitio:'Puerto Edén'}, {nombre_sitio:'Caleta Tortel'}, {nombre_sitio:'Puerto Yungay'}]; //objetos con ID y Nombre de Sito guardados en un Array
  destinos:any[] = []; //objetos con ID y Nombre de Sito guardados en un Array
  cruces:any[] = [];
  cruceSQL:any; //Data recibida por el servidor SQL -> Cruces
  fechas = {fecha:''} //Objeto a Enviar al Servicio Rest para que lo consuma el metodo.

  aux = 0; // variable auxiliar, que nos ayuda a guardar en la posicion correcta, los tramos encontrados que correspondan a lo seleccionado


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restServices: RestServiceProvider, private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
                this.infoViaje();
  }

  buscarCruce(destino){
    this.presentLoading()
    //Se comprueba que el id del tramo sean iguales, tanto del servidor como el seleccionado
    for (let i = 0; i < this.destinos.length; i++) {
      if(destino == this.destinos[i].nombre_sitio){
        var id_tramo = this.destinos[i].id_tramo;
        console.log(this.destinos[i].id_tramo);
      }
    }
    //Entre todos los tramos encontrados, buscamos lo que concuerden con el ID del tramos seleccionado por el operador, y guardamos solo dichos tramos en una variable.
    for (let j = 0; j < this.cruceSQL.recordset.length; j++) {
        if(this.cruceSQL.recordset[j].id_tramo == id_tramo){
          this.cruces[this.aux] = this.cruceSQL.recordset[j];
          this.aux = this.aux + 1;
        }
    }
    if(this.aux == 0){
      this.presentToast();
    }
  }
  //Funcion que toma la fecha del día y consulta al Procedimiento almacedado, aserca de los tramos de la fecha indicada. Y guarda la informacion recibida, en la variable cruceSQL
  infoViaje(){
    let fechaActual = new Date().toLocaleDateString()
    let fechaSplitted = fechaActual.split("/");
    let fechaNueva = fechaSplitted[2]+"-"+fechaSplitted[1]+"-"+fechaSplitted[0];
    this.fechas.fecha = fechaNueva.toString();
    this.restServices.postDate(this.fechas).then(data =>{
      this.cruceSQL = data;
    });
  }
  //Funcion que envia los datos seleccionados en la vista de Seleccion de Viajes, a la pagina de Resumen
  seleccionTramo(cruce, origen, destino){
    this.navCtrl.setRoot(ResumenPage, {cruce, origen, destino});
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'No se han encontrado Tramos disponibles. Por favor, consultar al encargado.',
      duration: 4500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando Cruces...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2500);

  }
  onSelectChange(origen:string){
    switch (origen){
      case "Punta Arenas":{
        this.destinos = [{nombre_sitio:'Pornvenir', id_tramo:1}, {nombre_sitio:'Puerto Williams', id_tramo:3}, {nombre_sitio:'Isla Magdalena', id_tramo:9}, {nombre_sitio:'Bahía Punta Arenas', id_tramo:11}];
        break;
      }
      case "Porvenir":{
        this.destinos = [{nombre_sitio:'Punta Arenas', id_tramo:2}];
        break;
      }
      case "Puerto Williams":{
        this.destinos = [{nombre_sitio:'Punta Arenas', id_tramo:4}];
        break;
      }
      case "Punta Delgada":{
        this.destinos = [{nombre_sitio:'Bahía Azul', id_tramo:5}];
        break;
      }
      case "Bahía Azul":{
        this.destinos =[{nombre_sitio:'Punta Delgada', id_tramo:6}];
        break;
      }
      case "Río Verde":{
        this.destinos = [{nombre_sitio:'Ponsomby', id_tramo:7}];
        break;
      }
      case "Ponsomby":{
        this.destinos = [{nombre_sitio:'Río Verde', id_tramo:8}]
        break;
      }
      case "Puerto Natales":{
        this.destinos = [{nombre_sitio:'Puerto Edén', id_tramo:41}, {nombre_sitio:'Caleta Tortel', id_tramo:42}, {nombre_sitio:'Puerto Yungay', id_tramo:43}];
        break;
      }
      case "Puerto Edén":{
        this.destinos = [{nombre_sitio:'Caleta Tortel', id_tramo:44}, {nombre_sitio:'Puerto Yungay', id_tramo:45}, {nombre_sitio:'Puerto Natales', id_tramo:51}];
        break;
      }
      case "Caleta Tortel":{
        this.destinos = [{nombre_sitio:'Puerto Yungay', id_tramo:46}, {nombre_sitio:'Puerto Natales', id_tramo:52}, {nombre_sitio:'Puerto Edén', id_tramo:54}];
        break;
      }
      case "Puerto Yungay":{
        this.destinos = [{nombre_sitio:'Puerto Natales', id_tramo:53}, {nombre_sitio:'Puerto Edén', id_tramo:55}, {nombre_sitio:'Caleta Tortel', id_tramo:56}];
        break;
      }
      default:{
        this.presentToast();
        break;
      }
    }
  }
  limpiarBusqueda(){
    this.navCtrl.setRoot(ViajesPage);
  }
}
