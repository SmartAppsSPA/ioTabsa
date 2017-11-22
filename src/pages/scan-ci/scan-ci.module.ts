import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanCiPage } from './scan-ci';

@NgModule({
  declarations: [
    ScanCiPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanCiPage),
  ],
})
export class ScanCiPageModule {}
