import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasajerosPendientesPage } from './pasajeros-pendientes';

@NgModule({
  declarations: [
    PasajerosPendientesPage,
  ],
  imports: [
    IonicPageModule.forChild(PasajerosPendientesPage),
  ],
})
export class PasajerosPendientesPageModule {}
