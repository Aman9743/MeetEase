import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  login : boolean = false;

  public apiUrl = 'http://192.168.0.65:9090/meets/api-v1'

  constructor(private http: HttpClient) { }

  displayAllUser(){
  return this.http.get(`${this.apiUrl}/user/all-users`);
  }

  displayProfile(){
    return this.http.get(`${this.apiUrl}/user/profile`);
  }

  deleteUser(userName: any) {
   return this.http
      .post(
        `${this.apiUrl}/admin/delete-member`,
        JSON.stringify(userName)
      )
     
  }
  createUser(data: any) {
    return this.http
      .post(
        `${this.apiUrl}/admin/register-member`,
        JSON.stringify(data)
      )
  }

  updateUser(data: any) {
    console.log(data);
   return this.http
      .post(`${this.apiUrl}/admin/update-member`, data) 
  }

  createMeeting(data:any){
    return this.http.post(`${this.apiUrl}/user/register-meeting`, JSON.stringify(data));
  }
  updateMeeting(data:any){
    return this.http.post(`${this.apiUrl}/user/update-meeting`,JSON.stringify(data));
  }
  getMeetingDetails(){
    return this.http.get(`${this.apiUrl}/user/all-meetings`);
  }
  updateProfile(data:any){
    return this.http.post(`${this.apiUrl}/user/profile-update`,data);
  }
  showAllMeetings(){
    return this.http.get(`${this.apiUrl}/user/profile`);
  }
}
