import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

import { Platform } from "ionic-angular";

@Injectable()
export class StorageServiceProvider {

  ajustes = {
    existe_usuario: false,
    mostrar_login: true,
    mostrar_seleccionTramo: true
  };
  usuario = {
    id_usuario: '',
    username: '',
    usersecondname: ''
  }
  cruce = {}

  constructor(private platform: Platform) {
    console.log('Hello StorageServiceProvider Provider');
  }

  cargar_storage(){
    if ( this.platform.is("cordova") ){
      // Dispositivo
    }
    else{
      // Desktop
      if(localStorage.getItem("ajustes") && localStorage.getItem("usuario")){
        this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
      }

    }
  }

  guardar_storage(){
    if ( this.platform.is("cordova") ){
      // Dispositivo
    }
    else{
      // Desktop
      localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
      localStorage.setItem("usuario", JSON.stringify(this.usuario));
    }
  }

}
