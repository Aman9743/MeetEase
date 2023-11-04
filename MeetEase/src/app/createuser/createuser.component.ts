import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dialog-content-example',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss'],
})
export class CreateuserComponent implements OnInit {
  hide = true;
  notify: any;
  form!: FormGroup;
  update: boolean = false;

  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<CreateuserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackBar: MatSnackBar,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
        Validators.pattern('^[a-zA-Z0-9]*$')
      ]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.pattern(
          /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,}$/
        ),
      ]),
    });

    if (this.data) {
      this.update = true;
      this.form.patchValue(this.data);
    }
  }
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }
  get age() {
    return this.form.get('age');
  }
  get gender() {
    return this.form.get('gender');
  }
  get username() {
    return this.form.get('username');
  }
  get role() {
    return this.form.get('role');
  }
  get password() {
    return this.form.get('password');
  }

  createUser(data: any) {
    console.log(this.update);
    if (this.update) {
      this.http.post(environment.apiUrl + `/admin/update-member`,data).subscribe((data: any) => {
        console.log(data);
        console.log(data.statusDesc);
        this.snackBar.open(data.statusDesc, 'Dismiss', {
          duration: 5000,
        });

      });
      this.dialogRef.close(true);
    } else {
      this.http.post(environment.apiUrl + `/admin/register-member`,JSON.stringify(data)).subscribe((data: any) => {
        console.log(data);
        console.log(data.statusDesc);
        this.snackBar.open(data.statusDesc, 'Dismiss', {
          duration: 5000,
        });
     
      });
      this.dialogRef.close(true);
    }

    // if (this.dialogRef) this.dialogRef.close(true);
  }
}
