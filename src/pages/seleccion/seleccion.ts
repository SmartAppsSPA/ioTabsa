import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//Importamos la Pagina a la que vamos a redireccionar
import { ViajesPage } from '../viajes/viajes';
//Importamos los plugins a utilizar
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

import { CmbscannerProvider } from '../../providers/cmbscanner/cmbscanner';


@Component({
  selector: 'page-seleccion',
  templateUrl: 'seleccion.html',
})
export class SeleccionPage {

  usuario:any;
  scannerActive:string ="barcode";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController, private storageService: StorageServiceProvider,
              public cmbScannerProvider : CmbscannerProvider) {
                this.usuario = this.navParams.data;
                this.storageService.usuario = this.navParams.data;
                this.storageService.ajustes.mostrar_login = false;
                console.log(this.usuario);
  }

  ionViewDidLoad(){
    this.storageService.cargar_storage();
    if(this.storageService.ajustes.existe_usuario == true){
      this.usuario = this.storageService.usuario;
      this.storageService.guardar_storage();
      console.log(this.usuario);
    }
    if(this.storageService.ajustes.existe_usuario == false){
      this.storageService.usuario = this.usuario;
      this.storageService.ajustes.existe_usuario = true;
      this.storageService.guardar_storage();
    }
  }

  abrirViajes():void{
    let loading = this.loadingCtrl.create({
    content: 'Cargando...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(ViajesPage, {id_usuario:this.usuario.id_usuario});
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1050);
  }

  startStopScanner(event){

    if(this.scannerActive == 'barcode')
    this.cmbScannerProvider.start();
  else
    this.cmbScannerProvider.stop();


  }
}
