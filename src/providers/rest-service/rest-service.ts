import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class RestServiceProvider {


  apiURL = 'http://104.131.88.98:8081';

  constructor(public http: HttpClient) {}

  getUsers(){
    return new Promise(resolve => {
      this.http.get(this.apiURL + '/Users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
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
      });
    });
  }

}
