import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-warningcomp',
  templateUrl: './warningcomp.component.html',
  styleUrls: ['./warningcomp.component.scss']
})
export class WarningcompComponent implements OnInit {
  // username : string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private service: ServiceService,
   private snackBar : MatSnackBar,
   private http : HttpClient){ }

   username = this.data;

  ngOnInit(): void {
  console.log(this.username); 
  }
  deleteUser() {
    console.log(this.username);
    // const user = { username : this.username }
    // console.log(JSON.stringify(user));
    this.http.post(environment.apiUrl + `/admin/delete-member`,this.username).subscribe((result:any) => {
      console.log(result);
     
      this.snackBar.open(result.statusDesc, 'Dismiss', {
        duration: 5000,
      });

    });;
  }

}
