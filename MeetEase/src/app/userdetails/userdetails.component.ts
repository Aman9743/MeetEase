import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';
import { ProfileupdateComponent } from '../profileupdate/profileupdate.component';
import { ProfiledataService } from '../services/profiledata.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
})
export class UserdetailsComponent implements OnInit {
 
  gender !: string;
  email !: string;
  name !: string;
  age !: number;
  data : any;
  memberrole !: string;
  
  constructor(private http: HttpClient,private service : ServiceService,public dialog: MatDialog, private dataService : ProfiledataService) {}

  openDialog(data:any): void {
    console.log(this.data);
    const dialogRef = this.dialog.open(ProfileupdateComponent,{ data });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  userDetails:any;
  ngOnInit() {
    this.service.displayProfile().subscribe((data:any)=>{
      this.data = data;
      this.name = data.name;
      this.age = data.age;
      this.gender = data.gender;
      this.email = data.email;

    })

    const role = localStorage.getItem("role");
    if(role == "ROLE_ADMIN"){
      this.memberrole = "ADMIN"
    }
    else{
      this.memberrole = "USER"
    }
  }

  showEditForm(){}
  
  // sendData() {
  //   this.dataService.name = this.name;
  //   this.dataService.age = this.age;
  //   this.dataService.gender = this.gender;
  //   this.dataService.email = this.email;
  // } 
}

