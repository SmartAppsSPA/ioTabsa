import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//Importamos Página Inicial
import { SeleccionPage } from "../seleccion/seleccion";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menu: MenuController) {
  }

  LoginApp():void{
    this.navCtrl.setRoot(SeleccionPage);
  }
  ionViewDidEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }

}
