import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//Importamos Página Inicial
import { SeleccionPage } from "../seleccion/seleccion";
//Consumimos servicio API Rest c/datos del servidor SQL Server
import { RestServiceProvider } from "../../providers/rest-service/rest-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  users: any;
  usersToUse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menu: MenuController, public restProvider: RestServiceProvider) {
      this.getUsers();
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

  getUsers(){
    this.restProvider.getUsers().
      then(data => {
        this.users = data;
        console.log(this.users);
        this.usersToUse = this.users.recordset;
        console.log(this.usersToUse)
      });
  }

}
