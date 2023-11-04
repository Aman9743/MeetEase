import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totaluser !: number;
  activeuser !: number;
  inactiveuser !: number;
  totalmeet !: number;
  schedulemeet !: number;
  reschedulemeet !: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(environment.apiUrl + `/user/all-users`)
      .subscribe((data: any) => {
        console.log(data);
        this.totaluser = data.membersList.length;
        console.log(this.totaluser);
      });

      this.http
      .get(environment.apiUrl +`/user/active-users`)
      .subscribe((data: any) => {
        console.log(data);
        this.activeuser = data.count;
        console.log(this.activeuser);
      });
      
      this.http
      .get(environment.apiUrl +`/user/all-meetings`)
      .subscribe((data: any) => {
        console.log(data);
        this.totalmeet = data.allMeetings;
        this.schedulemeet = data.todaysMeetings;
        this.reschedulemeet = data.futureMeetings;
        console.log(this.totalmeet);  
      });
      
  }
}
