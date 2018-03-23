import { Injectable } from '@angular/core';

import { RestServiceProvider} from "../rest-service/rest-service";

import { Platform } from "ionic-angular";

@Injectable()
export class StorageServiceProvider {

  ajustes = {
    existe_usuario: false,
    mostrar_login: true,
    mostrar_seleccionTramo: false
  };
  usuario = {
    id_usuario: '',
    username: '',
    usersecondname: ''
  }
  cruce = {}

  UsersSQL:any;
  TramosSQL:any;

  constructor(private platform: Platform, public restService: RestServiceProvider) {
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
  guardar_usuariosSQL(){
    localStorage.setItem("UsersSQL", JSON.stringify(this.UsersSQL));
  }
  cargar_usuariosSQL(){
    if(localStorage.getItem("UsersSQL")){
      this.UsersSQL = JSON.parse(localStorage.getItem("UsersSQL"));
    }
  }

  guardar_Tramos(){
    localStorage.setItem("TramosSQL", JSON.stringify(this.TramosSQL));
  }
  cargar_Tramos(){
    if(localStorage.getItem("TramosSQL")){
      this.TramosSQL = JSON.parse(localStorage.getItem("TramosSQL"));
    }
  }


}
