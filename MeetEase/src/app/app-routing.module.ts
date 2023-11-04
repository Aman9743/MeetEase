import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { MeetingsComponent } from './shared/meetings/meetings.component';
import { AuthGuard } from './services/auth.guard';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { UserComponent } from './user/user.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';


const routes: Routes = [
  {
    path: '',component: LoginComponent
  },
  {
    // 
    path: 'admin', component: AdminComponent, canActivate : [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent, 
      },
      {
        path: 'user',
        component: UserComponent, 
      },
      {
        path: 'meetings',
        component: MeetingsComponent, 
      }
    ],
  },
  {
    path: 'userpanel',component: UserpanelComponent, 
    children: [
      {
        path: '',
        component: DashboardComponent, 
      },
      {
        path: 'meetings',
        component: MeetingsComponent, 
      }
    ],
  },
  {
     path: 'forgetpass', component: ForgetpassComponent
   },
  // {
  //   path: 'updateuser', component: UpdateuserComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ],
})
export class AppRoutingModule { }
