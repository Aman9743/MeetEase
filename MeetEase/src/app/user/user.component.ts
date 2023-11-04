import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateuserComponent } from '../createuser/createuser.component';
import { ServiceService } from '../services/service.service';
import { WarningcompComponent } from '../warningcomp/warningcomp.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'table-pagination-example',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  
  constructor(public dialog: MatDialog, private service: ServiceService,private http : HttpClient) {}

  users: any;
  dataSource: any;
  ngOnInit(): void {
    this.http.get(environment.apiUrl + `/user/all-users`).subscribe((result: any) => {
      this.users = result.membersList;
      console.log(this.users);
      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogBox(userName:any) {
     
   console.log(userName)
   let data:any= { username: userName }
   console.log(data)
    const dialogRef = this.dialog.open(WarningcompComponent, { data});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      dialogRef.componentInstance.username = userName; 
      
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'gender',
    'email',
    'action',
  ];

 

  searchUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
   
    const dialogBox =  this.dialog.open(CreateuserComponent, { width: '50%' });
    dialogBox.afterClosed().subscribe(result => {
      console.log('create response')
      console.log(`Dialog result: ${result}`); 
      this.http.get(environment.apiUrl + `/user/all-users`).subscribe((result: any) => {
        this.users = result.membersList;
      });
    });

  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 

  userUpdate(data: any) {
  const dialogBox =  this.dialog.open(CreateuserComponent, { data, width: '50%' });
    dialogBox.afterClosed().subscribe(result => {
      console.log('create response')
      console.log(`Dialog result: ${result}`); 
      if(result===true){

      console.log('true form create user')
      this.http.get(environment.apiUrl + `/user/all-users`).subscribe((result: any) => {
        console.log(result)
        this.users = result.membersList;
        this.dataSource = new MatTableDataSource<any>(this.users);
        this.dataSource.paginator = this.paginator;
      });
    }
    });
  }
}

