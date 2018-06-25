import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//Importamos Página Inicial
import { SeleccionPage } from "../seleccion/seleccion";
//Importamos el servicio Rest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
//importamos plugin a utilizar
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

  cruceSQL:any; //Data recibida por el servidor SQL -> Cruces
  fechas = {fecha:''} //Objeto a Enviar al Servicio Rest para que lo consuma el metodo.

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menu: MenuController, public restService: RestServiceProvider,
              public http: HttpClient, private toastCtrl: ToastController,
              public loadingCtrl: LoadingController, private storageService: StorageServiceProvider) {



  }

  loginApp(){
    let password = (Md5.hashStr(this.credenciales.password).toString()).toUpperCase();
    for (let i = 0; i < this.usersSQL.length; i++) {
        if( this.credenciales.username == this.usersSQL[i].username && password == this.usersSQL[i][""] ){
          console.log("usuario encontrado");
          this.presentLoading(i);
          break;
        }
        else if(i == (this.usersSQL.length-1)){
          this.presentToast();
        }
    }
  }
  ionViewWillEnter(){
    this.getUsers();
    this.infoViaje();
  }

  getUsers(){
    this.restService.getUsers()
      .then(data => {
        if(data['name'] === 'HttpErrorResponse'){
          console.log("No Hay conexión");
          this.storageService.cargar_usuariosSQL();
          this.usersSQL = this.storageService.UsersSQL;
          console.log(this.usersSQL);
        }
        else{
          this.usersSQL = data;
          console.log(this.usersSQL);
          this.storageService.UsersSQL = this.usersSQL;
          this.storageService.guardar_usuariosSQL();
        }

      });

  }
  infoViaje(){
    let fechaActual = new Date().toLocaleDateString()
    let fechaSplitted = fechaActual.split("/");
    let fechaNueva = fechaSplitted[2]+"-"+fechaSplitted[1]+"-"+fechaSplitted[0];
    this.fechas.fecha = fechaNueva.toString();
    console.log(fechaNueva);
    this.restService.postDate(this.fechas).then(data =>{
      if(data['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        this.storageService.cargar_Tramos();
        this.cruceSQL = this.storageService.TramosSQL;
        console.log(this.cruceSQL);
      }
      else{
        this.cruceSQL = data;
        console.log(this.cruceSQL);
        this.storageService.TramosSQL = this.cruceSQL;
        this.storageService.guardar_Tramos();
      }
    });
  }


  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Usuario no encontrado. Verifique nombre de Usuario y/o Contraseña Incorrecta.',
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
  }, 1200);

    setTimeout(() => {
      loading.dismiss();
    }, 1400);
  }
  ionViewDidEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }

}
