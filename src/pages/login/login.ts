import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//Importamos Página Inicial
import { SeleccionPage } from "../seleccion/seleccion";
//Importamos el servicio Rest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
import {Md5} from 'ts-md5/dist/md5';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credenciales = {username:'', password:''};
  usersSQL:any;
  credencialesSQL:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menu: MenuController, public restService: RestServiceProvider,
              public http: HttpClient, private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
                this.getUsers();
  }

  loginApp(){
    let password = (Md5.hashStr(this.credenciales.password).toString()).toUpperCase();
    for (let i = 0; i < this.usersSQL.length; i++) {
        if(this.credenciales.username == this.usersSQL[i].username && password == this.usersSQL[i][""]){
          console.log("usuario encontrado");
          this.presentLoading(i);
          break;
        }
        else if(this.credenciales.username != this.usersSQL[i].username && password != this.usersSQL[i][""]){
          this.presentToast();
          break;
        }
    }
  }

  getUsers(){
    this.restService.getUsers()
      .then(data => {
        this.usersSQL = data;
        console.log(this.usersSQL);
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
  presentLoading(i) {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });

    loading.present();

    setTimeout(() => {
    this.navCtrl.setRoot(SeleccionPage, {id_usuario: this.usersSQL[i].id_usuario, username: this.usersSQL[i].nombre, usersecondname: this.usersSQL[i].apellido});
    }, 1500);

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
  ionViewDidEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }

}
