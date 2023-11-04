import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  token: any;
tokennum = localStorage.getItem('token')

constructor(private router : Router){

}
  processData(token: any) {
 console.log(token);
    this.token = token;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.tokennum) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
