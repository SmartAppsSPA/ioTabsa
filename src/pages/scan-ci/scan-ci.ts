import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
//Importamos el plugin para Escanear Codigo QR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//importamos paginas a redireccionar
import { AprobacionPage } from "../aprobacion/aprobacion";
import { VerificacionPage } from "../verificacion/verificacion";
import { RechazoPage } from "../rechazo/rechazo";

@IonicPage()
@Component({
  selector: 'page-scan-ci',
  templateUrl: 'scan-ci.html',
})
export class ScanCiPage {
  tramo:any;
  dataQR:any

  dataCI:any;
  manipulacionDataCI:any;

  rut:string;
  fech_nac:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner, public loadingCtrl: LoadingController) {
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.presentLoading();
      this.dataCI = barcodeData.text;
      //Manipulamos la información entregada por el CI para usar solo el Rut, en este caso, dicho dato queda en splittedRUT[1]
      this.manipulacionDataCI = this.dataCI.split("&");
      let splittedRUT = this.manipulacionDataCI[0].split("=");
      // Manipulamos la data entregada por el QR del CI para obtener la fecha de nacimiento, encontrada en la seccion MRZ del CI, en este caso se guarda en la variable slicedFechNAC

      let splittedFechNAC = this.manipulacionDataCI[3].split("=");
      let slicedFechNAC = splittedFechNAC[1].slice(10, -8)
      let transformSlicedFechaNAC = '19' + slicedFechNAC.slice(0, -4) + '-' + slicedFechNAC.slice(2,-2) + '-' + slicedFechNAC.slice(4);
      console.log(this.fech_nac);
      console.log(this.rut);
      console.log(transformSlicedFechaNAC);
      console.log(splittedRUT[1]);

      if(transformSlicedFechaNAC == this.fech_nac && splittedRUT[1] == this.rut){
        this.navCtrl.setRoot(AprobacionPage, {dataQR:this.dataQR, tramo:this.tramo});
      }
      else{
        this.navCtrl.setRoot(RechazoPage, this.tramo);
      }
    });
  }
  verificacionManual(){
  this.navCtrl.push(VerificacionPage, {dataQR:this.dataQR, tramo:this.tramo});
  }
  ionViewWillEnter(){
    this.tramo = this.navParams.data.tramo;
    this.dataQR = this.navParams.data.dataQR;
    console.log(this.tramo);
    console.log(this.dataQR);
    this.rut = this.dataQR[4];
    this.fech_nac = this.dataQR[10]
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Validando Ticket...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

  }

}
