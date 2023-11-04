import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfiledataService } from '../services/profiledata.service';
import { ServiceService } from '../services/service.service';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.scss'],
})
export class ProfileupdateComponent {
  userForm: any;
  error!: string;

  isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    console.log(this.data)
    console.log(this.data.age);
    console.log(this.data.gender);
    console.log(this.data.email);
    
    this.userForm = this.formBuilder.group({
      name: [
        '',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),]
      ],
      age: ['',Validators.required,  Validators.compose([Validators.min(12), Validators.max(100)])],
      gender: ['', Validators.required],
      email: ['', Validators.compose([ Validators.required,Validators.email])],
    });

    // this.userForm.patchValue({
    //   name : this.data.name,
    //   age : this.data.age,
    //   gender : this.data.gender,
    //   email : this.data.email
    // })
    if(this.data){
      console.log('data')
      this.userForm.patchValue(this.data)
    }
  }

  isFieldInvalid(fieldName: string) {
    return (
      this.userForm.get(fieldName).invalid &&
      (this.userForm.get(fieldName).dirty || this.isFormSubmitted)
    );
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    // Process the form data here
    console.log(this.userForm.value);
    // this.service.updateProfile(this.userForm.value).subscribe(
    //   (res: any) => {
    //     console.log(res);
  }

  profiledata() {
    console.log(this.userForm.value);
    this.http.post(environment.apiUrl + `/user/profile-update`,this.userForm.value).subscribe((res: any) => {
      console.log(res);
    }),
      (error: { message: string }) => {
        this.error = error.message;
      };
  }
}
