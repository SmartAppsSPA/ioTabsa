import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importamos paginas a redireccionar
import { ScanQrPage } from "../scan-qr/scan-qr";
//Importamos Servicios APIRest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";

@IonicPage()
@Component({
  selector: 'page-aprobacion',
  templateUrl: 'aprobacion.html',
})
export class AprobacionPage {
  tramo:any;
  dataQR:any;

  resultadoSP:any;

  data = {id_ticket:'', id_reserva:'', id_cruce:'', id_tramo:'', val_seed:'', id_usuario:''};
  dataVehiculo = {id_ticket:'', id_reserva:'', id_cruce:'', id_tramo:'', id_vehiculo:'', patente:'', val_seed:'', id_usuario:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restServices: RestServiceProvider) {
                this.tramo = this.navParams.data.tramo;
                this.dataQR = this.navParams.data.dataQR;
                console.log(this.tramo);
                //Reproducción de audio de aprobación al entrar a la página.
                let audio = new Audio();
                audio.src = "assets/audio/pasajero_embarcado.mp3";
                audio.load();
                audio.play();
  }

  siguientePasajero(){
    this.navCtrl.setRoot(ScanQrPage, this.tramo);
    }
  //Inovocamos al procedimiento almacenado al momento de cargar la pagina
  ionViewWillEnter(){
  if(this.dataQR[0] == '1'){
    this.data = {id_ticket:this.dataQR[1], id_reserva:this.dataQR[2], id_cruce:this.dataQR[9], id_tramo:this.dataQR[3], val_seed:this.dataQR[11], id_usuario:this.tramo.id_usuario.id_usuario};

    this.restServices.postUtilTicket(this.data).then(dataSP=>{
      if(dataSP['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        //guardar datos para invocar procedimiento almacenado al iniciar sesion.



      }
    });
  }
  else{
    this.dataVehiculo = {id_ticket:this.dataQR[1], id_reserva:this.dataQR[2], id_cruce:this.dataQR[9], id_tramo:this.dataQR[3], id_vehiculo:this.dataQR[4], patente:this.dataQR[5], val_seed:this.dataQR[10], id_usuario:this.tramo.id_usuario.id_usuario};
    this.restServices.postUtilTicketVehiculo(this.dataVehiculo).then(dataSP=>{
      if(dataSP['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        //guardar datos para invocar procedimiento almacenado al iniciar sesion.
        }
      });
    }
  }
  }
