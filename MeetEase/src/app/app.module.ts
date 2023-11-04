import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminComponent } from './admin/admin.component';
import { CreatemeetingComponent } from './createmeeting/createmeeting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { HeaderInterceptorInterceptor } from './services/header-interceptor.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { MeetingsComponent } from './shared/meetings/meetings.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateuserComponent } from './createuser/createuser.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { UserComponent } from './user/user.component';
import {MatSelectModule} from '@angular/material/select';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { WarningcompComponent } from './warningcomp/warningcomp.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CreatemeetingComponent,
    DashboardComponent,
    UserdetailsComponent,
    MeetingsComponent,
    UserdetailsComponent,
    CreateuserComponent,
    UserpanelComponent,
    UserComponent,
    ForgetpassComponent,
    ProfileupdateComponent,
    WarningcompComponent
  ],
  imports: [   
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    SchedulerModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatSnackBarModule,
    FullCalendarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:HeaderInterceptorInterceptor,
      multi: true,
   },
   DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
