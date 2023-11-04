import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  notifications: any;
  meet !: number;
  count !: number;
  title !: string;
  summary !: string;
  name !: string;
  notificatonCount:boolean = false;
  roleAccess : boolean = false;

  constructor(public dialog: MatDialog,private router:Router, private http : HttpClient) {}

  ngOnInit(): void {
    this.http.get(environment.apiUrl + `/user/profile`).subscribe((res:any)=>{
      console.log(res);
      this.name = res.name;
      
    this.notifications = res.notifications;
    this.count = res.notifications.length;
    console.log(this.count)
    
    if(this.count==0){
      this.count = 0;
    } 
    console.log(this.count); 
    })

    const role = localStorage.getItem("role")
    console.log(role)
    if(role=="ROLE_USER"){
    this.roleAccess = true;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserdetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onLogout(){
    console.log(10)
    localStorage.removeItem("token");
    this.router.navigate(['./']);
    this.http.post(environment.apiUrl + `/user/logout`,null).subscribe((res:any)=>{
      console.log(res)
    });
  }
 
  showNtf(){
    this.http.get(environment.apiUrl + `/user/profile`).subscribe((res:any)=>{
      console.log(res);
     
    this.notifications = res.notifications;
    console.log(this.notifications);

    if(res.notifications == ' '){
      this.notificatonCount = true;
    } 
    })
  }
}
