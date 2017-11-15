import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//Pantallas de la App
import { LoginPage } from '../pages/login/login';
import { SeleccionPage } from '../pages/seleccion/seleccion';
import { ViajesPage } from "../pages/viajes/viajes";
import { ResumenPage } from '../pages/resumen/resumen';
import { VerificacionPage } from "../pages/verificacion/verificacion";
import { ResultadoPage } from "../pages/resultado/resultado";
import { ScanQrPage } from "../pages/scan-qr/scan-qr";
//Modales
import { CierreEmbarquePage } from "../pages/cierre-embarque/cierre-embarque";
import { AyudaPage } from "../pages/ayuda/ayuda";
//plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SeleccionPage,
    ViajesPage,
    ResumenPage,
    VerificacionPage,
    ResultadoPage,
    CierreEmbarquePage,
    AyudaPage,
    ScanQrPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SeleccionPage,
    ViajesPage,
    ResumenPage,
    VerificacionPage,
    ResultadoPage,
    CierreEmbarquePage,
    AyudaPage,
    ScanQrPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
