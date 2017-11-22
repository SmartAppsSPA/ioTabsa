import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//Importamos Página Inicial
import { SeleccionPage } from "../seleccion/seleccion";
//Importamos el servicio Rest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credenciales = {username:'', password:''};
  users:any;
  credencialesSQL:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menu: MenuController, public restService: RestServiceProvider,
              public http: HttpClient) {
                this.getUsers();
  }

  loginApp(){
    // return this.http.post(this.restService.apiURL + '/Users', JSON.stringify({}))
    this.restService.loginUsers(this.credenciales)
    .then(data => {
      this.credencialesSQL = data;
      if(JSON.stringify(this.credencialesSQL.recordset[0]) == JSON.stringify(this.credenciales)){
        this.navCtrl.setRoot(SeleccionPage, {username: JSON.stringify(this.credencialesSQL.recordset[0].username)});
      }
      else{
        console.log('Login fallido');
      }


    });
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }

  getUsers(){
    this.restService.getUsers()
      .then(data => {
        this.users = data;
        console.log(this.users.recordset);
        // this.usersToUse = this.users.recordset;
        // console.log(this.usersToUse)
      });
  }

}
