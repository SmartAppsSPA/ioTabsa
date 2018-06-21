import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanQrVehiculosPage } from './scan-qr-vehiculos';

@NgModule({
  declarations: [
    ScanQrVehiculosPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanQrVehiculosPage),
  ],
})
export class ScanQrVehiculosPageModule {}
