import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//Importamos Servicios APIRest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";

@Component({
  selector: 'page-pasajeros-pendientes',
  templateUrl: 'pasajeros-pendientes.html',
})
export class PasajerosPendientesPage {
  tramo:any;

  pasajeros:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restService: RestServiceProvider, public loadingCtrl: LoadingController) {
                if(this.navCtrl.getActive().data.cruce){
                  this.presentLoading();
                  this.tramo = this.navCtrl.getActive().data;
                  let id_cruce_tramo:any = {id_cruce:this.tramo.cruce.id_cruce, id_tramo:this.tramo.cruce.id_tramo};
                  this.restService.postListaPasajeros(id_cruce_tramo).then(dataSP =>{
                    this.pasajeros = dataSP;
                    console.log(this.pasajeros);
                  });
                }
                else{
                  console.log("Tramo aun no seleccionado");
                }
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Lista de Pasajeros...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2500);
  }


}
