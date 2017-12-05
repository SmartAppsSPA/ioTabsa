import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
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
              public http: HttpClient, private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
                this.getUsers();
  }

  loginApp(){
    // return this.http.post(this.restService.apiURL + '/Users', JSON.stringify({}))
    this.restService.loginUsers(this.credenciales)
    .then(data => {
      this.credencialesSQL = data;
      if(JSON.stringify(this.credencialesSQL.recordset[0]) == JSON.stringify(this.credenciales)){
        this.presentLoading();
      }
      else{
        this.presentToast();
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
  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Usuario o Contraseña Incorrecta.',
    duration: 3500,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }
  presentLoading() {
  let loading = this.loadingCtrl.create({
    content: 'Iniciando sesión...'
  });

  loading.present();

  setTimeout(() => {
  this.navCtrl.setRoot(SeleccionPage, {username: JSON.stringify(this.credencialesSQL.recordset[0].username)});
}, 1500);

  setTimeout(() => {
    loading.dismiss();
  }, 3000);
  }

}
