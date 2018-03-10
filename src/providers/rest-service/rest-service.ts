import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class RestServiceProvider {

  //Ip Local servidor Tabsa
  // apiURL = 'http://192.168.1.25:24500';
   apiURL = 'http://190.151.39.34:24500';

  constructor(public http: HttpClient) {}

  getUsers(){
    return new Promise(resolve => {
      this.http.get(this.apiURL + '/Users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        resolve(err);
    });
  });
  }
  loginUsers(credenciales){
    return new Promise (resolve => {
      this.http.post(this.apiURL + '/Login', credenciales).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);

      });
    });
  }
  getSitios(){
    return new Promise (resolve => {
      this.http.get(this.apiURL + '/Sitios').subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
      });
    });
  }
  postDate(fecha){
    return new Promise (resolve => {
      this.http.post(this.apiURL + '/Cruces', fecha).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
        resolve(err);
      });
    });
  }
  postValTicket(ticket){
    return new Promise(resolve =>{
      this.http.post(this.apiURL + '/valTicket', ticket).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
        resolve(err);
      });
    });
  }
  postUtilTicket(ticketWuser){
    return new Promise(resolve =>{
      this.http.post(this.apiURL + '/utilTicket', ticketWuser).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
        resolve(err);
      });
    });
  }
  postCantPasajeros(id_cruce_tramo){
    return new Promise (resolve => {
      this.http.post(this.apiURL + '/cantPasajeros', id_cruce_tramo).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
        resolve(err);
      });
    });
  }
  postListaPasajeros(id_cruce_tramo){
    return new Promise (resolve => {
      this.http.post(this.apiURL + '/pendientePasajeros', id_cruce_tramo).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err);
      });
    });
  }

}
