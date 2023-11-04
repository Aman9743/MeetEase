import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './meetings/meetings.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    MeetingsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
