import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanCiManualPage } from './scan-ci-manual';

@NgModule({
  declarations: [
    ScanCiManualPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanCiManualPage),
  ],
})
export class ScanCiManualPageModule {}
