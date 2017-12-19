import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { MyApp } from './app.component';
//Pantallas de la App
import { LoginPage } from '../pages/login/login';
import { SeleccionPage } from '../pages/seleccion/seleccion';
import { ViajesPage } from "../pages/viajes/viajes";
import { ResumenPage } from '../pages/resumen/resumen';
import { VerificacionPage } from "../pages/verificacion/verificacion";
import { ResultadoPage } from "../pages/resultado/resultado";
import { ScanQrPage } from "../pages/scan-qr/scan-qr";
import { ScanCiPage } from "../pages/scan-ci/scan-ci";
import { RechazoPage } from "../pages/rechazo/rechazo";
import { AprobacionPage } from "../pages/aprobacion/aprobacion";
//Modales
import { AyudaPage } from "../pages/ayuda/ayuda";
import { PasajerosPendientesPage } from "../pages/pasajeros-pendientes/pasajeros-pendientes";
//plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { IonicStorageModule } from '@ionic/storage';

//Servicios de la Aplicacion
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SeleccionPage,
    ViajesPage,
    ResumenPage,
    VerificacionPage,
    ResultadoPage,
    PasajerosPendientesPage,
    AyudaPage,
    ScanQrPage,
    ScanCiPage,
    RechazoPage,
    AprobacionPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SeleccionPage,
    ViajesPage,
    ResumenPage,
    VerificacionPage,
    PasajerosPendientesPage,
    ResultadoPage,
    AyudaPage,
    ScanQrPage,
    ScanCiPage,
    RechazoPage,
    AprobacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    TextToSpeech,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServiceProvider,
    Md5,
    IonicStorageModule,
    StorageServiceProvider
  ]
})
export class AppModule {}
