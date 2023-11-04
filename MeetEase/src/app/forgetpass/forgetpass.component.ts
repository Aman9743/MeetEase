
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-forgetpass',
     templateUrl: './forgetpass.component.html',
    styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent{

  showBox: boolean = false;
  showbutton: boolean = true;
  showbtn1: boolean = false;
  showUpdate: boolean = false;
  showForgot: boolean = true;
  form!: FormGroup;
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2),
        Validators.maxLength(12),
        Validators.pattern('^[a-zA-Z0-9]*$')]),
      otp: new FormControl('', [Validators.required,Validators.maxLength(6),Validators.pattern('^[0-9]*$')]),
      password: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(12),Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,}$/)]),
    });
  }
  error!: string;

  onSubmitUsername() {
    console.log(this.form.value);
    let username: any = { username: this.form.value.username };
    console.log(username, 'USERNAME'); //send username

    this.http
      .post(
        environment.apiLogin +`/forgot-password`,
        JSON.stringify(username)
      )
      .subscribe(
        (res: any) => {
      //     let token = res['token'];
      // console.log(token);
          console.log(res, 'FORGOT PASSWORD');
          if (res.statusDesc === 'Your request processed successfully') {
            this.showBox = true;
            this.showbutton = false;
          } else {
            this.error = res.statusDesc;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  errorMsg!: string;
  onSubmitOtp() {
    console.log(this.form.value);
    let value: any = {
      username: this.form.value.username,
      otp: Number(this.form.value.otp),
    };
    console.log(value, 'OTP');

    this.http
      .post(environment.apiLogin +`/otp-login`, JSON.stringify(value))
      .subscribe((res: any) => {
        console.log(res, 'OTP RESP');
        if (res.statusDesc === 'Bad Credentials.') {
          this.errorMsg = res.statusDesc;
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.showbtn1 = true;
          this.showUpdate = true;
          this.showForgot = false;
          this.showbutton = false;
        }
      });
  }

  onSubmitPassword() {
    console.log(this.form.value);
    const Token = localStorage.getItem('token');
    let value: any = {
      token: Token,
      password: this.form.value.password,
    };
    this.http
      .post(
        environment.apiUrl +`/user/password-change`,
        JSON.stringify(value)
      )
      .subscribe((res: any) => {
        console.log('PASSWORD', res);
        if (res.statusDesc === 'Your request processed successfully') {
          this.router.navigate(['']);
        }
      });
  }

}