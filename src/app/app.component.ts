import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { PasajerosPendientesPage } from "../pages/pasajeros-pendientes/pasajeros-pendientes";
//plugins a utilizar
import { Storage } from "@ionic/storage";




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  Ayuda = AyudaPage;
  PasajerosPendientes = PasajerosPendientesPage;

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController, public storage: Storage ) {
    platform.ready().then(() => {
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
    this.nav.setRoot(LoginPage);
    this.menuCtrl.close();
  }

}
