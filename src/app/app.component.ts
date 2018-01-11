import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { SeleccionPage } from "../pages/seleccion/seleccion";
import { AyudaPage } from '../pages/ayuda/ayuda';
import { PasajerosPendientesPage } from "../pages/pasajeros-pendientes/pasajeros-pendientes";
import { ScanQrPage } from "../pages/scan-qr/scan-qr";
//plugins a utilizar
import { Storage } from "@ionic/storage";
import { StorageServiceProvider } from "../providers/storage-service/storage-service";
import { RestServiceProvider } from "../providers/rest-service/rest-service";




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  Ayuda = AyudaPage;
  PasajerosPendientes = PasajerosPendientesPage;


  UsersSQL:any;


  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController, public storage: Storage,
              private storageService: StorageServiceProvider, public restServices: RestServiceProvider) {
    platform.ready().then(() => {


      this.storageService.cargar_storage();

      if(this.storageService.ajustes.mostrar_seleccionTramo){
        this.rootPage = ScanQrPage
      }
      else{
        if(this.storageService.ajustes.mostrar_login){
          this.rootPage = LoginPage;
        }
        else{
          this.rootPage = SeleccionPage;
        }
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina( pagina:any ){
    this.nav.push(pagina);
    this.menuCtrl.close();
  }
  logOut(){
    localStorage.removeItem("ajustes");
    localStorage.removeItem("usuario");
    localStorage.removeItem("cruce");
    this.nav.setRoot(LoginPage);
    this.menuCtrl.close();
  }


}
