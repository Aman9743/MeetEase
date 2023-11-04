import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogindetailService } from '../services/logindetail.service';
import { AuthGuard } from '../services/auth.guard';
import { SharedataService } from '../services/sharedata.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error !: String;
  role !: string;

  constructor(private login: LogindetailService, private router:Router,
     private auth : AuthGuard ,private dataService: SharedataService,
     private snackBar : MatSnackBar,private http :HttpClient) {}

  hide = true;
  message = "Login Failed";


  onDetailSubmit(credentials: { id: string; pass: number }) {
    console.log(credentials);
    this.http.post(environment.apiLogin+ `/login`,credentials).subscribe((res: any)=>{
      console.log(res);
      this.role = res.role;
      console.log(  this.role);
      localStorage.setItem("role", this.role);
      this.snackBar.open(res.statusDesc, 'Dismiss', {
        duration: 5000,
      })

    // this.login.sendData(credentials).subscribe((res: any)=>{
    //   console.log(res);
    //   this.snackBar.open(res.statusDesc, 'Dismiss', {
    //     duration: 5000,
    //   })

      let token = res['token'];
      console.log(token);
      console.log(10);
    
      if(token){
        localStorage.setItem("token",token);
        this.auth.processData(token);
      
        this.router.navigate(['/admin']);
 
        this.dataService.updateData(token);
    
      }
    }, (error) => {
      this.error = error.message;
    
    })

  }
  token(token: any) {
    throw new Error('Method not implemented.');
  }

  forgetPassword(){
    console.log('forget password')
  }
}
function updateSharedData() {
  throw new Error('Function not implemented.');
}


