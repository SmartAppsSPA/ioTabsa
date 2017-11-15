import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner) {
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
    // Success! Barcode data is here
    }, (err) => {
      // An error occurred
    });
  }
}
