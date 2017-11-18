import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class RestServiceProvider {


  apiURL = 'http://192.168.0.7:8081';

  constructor(public http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }

  getUsers(){
    return new Promise(resolve => {
      this.http.get(this.apiURL + '/Users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
    });
  });
  }
}
