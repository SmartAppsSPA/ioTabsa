import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { CierreEmbarquePage } from "../pages/cierre-embarque/cierre-embarque";
import { AyudaPage } from '../pages/ayuda/ayuda';
//plugins a utilizar
import { Storage } from "@ionic/storage";

import { ScanCiPage } from "../pages/scan-ci/scan-ci";
import { ViajesPage } from "../pages/viajes/viajes";




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  Ayuda = AyudaPage;
  CierreEmbarque = CierreEmbarquePage;

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina( pagina:any ){
    this.rootPage = pagina;
    this.menuCtrl.close();
  }
}
