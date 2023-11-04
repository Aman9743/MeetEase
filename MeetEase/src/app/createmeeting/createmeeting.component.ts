import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-createmeeting',
  templateUrl: './createmeeting.component.html',
  styleUrls: ['./createmeeting.component.scss'],
})
export class CreatemeetingComponent {
  myForm!: any;
  create: boolean = false;
  hide = true;
  notify: any;
  members: any = [];
  memberList: any = this.members;
  consUpdate : boolean = false;

  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.http.get(environment.apiUrl + `/user/all-users`).subscribe((result: any) => {
      let members: any = result.membersList;
      for (let i = 0; i < result.membersList.length; i++) {
        this.members.push(members[i].username);
      }
      console.log(this.members);
    });

    this.myForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z 0-9]*$'),
      ]),
      meetid: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z 0-9]*$'),
      ]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      consecutive: new FormControl('', [Validators.required]),
      consecutiveUpdate: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        // Validators.minLength(2),
        // Validators.maxLength(12),
        //Validators.pattern('^[a-zA-Z0-9]*$'),
      ]),
    });

    if (this.data.title) {
      console.log(this.data);
      this.consUpdate = true;
      console.log(this.data.extendedProps.meetid);

      const startFormatted = this.datePipe.transform(
        this.data.start,
        'yyyy-MM-dd HH:mm:ss'
      );
      const endFormatted = this.datePipe.transform(
        this.data.end,
        'yyyy-MM-dd HH:mm:ss'
      );

      this.myForm.patchValue({
        title: this.data.title,
        description: this.data.extendedProps.description,
        start: startFormatted,
        end: endFormatted,
        meetid: this.data.extendedProps.meetid,
        // consecutive:
      });
    } else {
      this.create = true;
      console.log(this.data.res.dateStr);
      this.myForm.patchValue(
        {
          start : this.data.res.dateStr,
           end : this.data.res.dateStr,
        }
      )
    }
  }
  createMeeting(data: any) {
    console.log(this.create);
    console.log(data);
    if (this.create) {
      this.http.post(environment.apiUrl + `/user/register-meeting`,JSON.stringify(data)).subscribe((data: any) => {
        console.log(data);
        console.log(data.statusDesc);
        this.snackBar.open(data.statusDesc, 'Dismiss', {
          duration: 3000,
        });
      });
      // this.service.showAllMeetings().subscribe((res:any)=>{
      //   console.log(res)
      // })
    } else {
    
      console.log(this.create);
      console.log(this.data);
      console.log('abc');
      this.http.post(environment.apiUrl + `/user/update-meeting`,JSON.stringify(data)).subscribe((data: any) => {
        console.log(data);
        console.log(data.statusDesc);
        this.snackBar.open(data.statusDesc, 'Dismiss', {
          duration: 3000,
        });
      });
    }
    // this.service.showAllMeetings().subscribe((res:any)=>{
    //   console.log(res)
    // })

    // if (this.dialogRef) this.dialogRef.close();
  }
  deleteMeeting() {
    let meetid = { meetid: this.data.extendedProps.meetid};
    this.http
      .post(environment.apiUrl + `/user/delete-meeting`, meetid)
      .subscribe((res: any) => {
        console.log(res);
        this.snackBar.open(res.statusDesc, 'Dismiss', {
          duration: 3000,
        });
      });
  }
}
