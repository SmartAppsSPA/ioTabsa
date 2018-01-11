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
    this.data = {id_ticket:this.dataQR[0], id_reserva:this.dataQR[1], id_cruce:this.dataQR[8], id_tramo:this.dataQR[2], val_seed:this.dataQR[10], id_usuario:this.tramo.id_usuario.id_usuario};
    this.restServices.postUtilTicket(this.data).then(dataSP =>{
      if(dataSP['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        this.navCtrl.setRoot(ScanQrPage, this.tramo);
      }
      else{
        this.resultadoSP = dataSP[0];
        if(this.resultadoSP.resultado =! 0){
          this.navCtrl.setRoot(ScanQrPage, this.tramo);
        }
        else{
          this.navCtrl.setRoot(ScanQrPage, this.tramo);
        }
      }

    })
  }

}
