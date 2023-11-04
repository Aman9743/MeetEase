import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogindetailService {

  public loginApi = 'http://192.168.0.65:9090/meets/login'

  constructor( private http : HttpClient) {}
  sendData(data: any) {
  return this.http.post(this.loginApi, data);
  }
 
}
