import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatemeetingComponent } from 'src/app/createmeeting/createmeeting.component';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ServiceService } from 'src/app/services/service.service';
import { HttpClient } from '@angular/common/http';
import interactionPlugin from '@fullcalendar/interaction';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  selectedDate!: Date;
  isPopupOpen = false;
  meetArray = [];
  meetings: any[]=[];

  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    private http: HttpClient
  ) {}

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.openDialog.bind(this),
    eventClick: (info)=>{
      this.openDialogBox(info.event)
    },
    weekends: true,
    events: [],
  };

  ngOnInit(): void {
    this.http
      .get( environment.apiUrl + `/user/profile`)
      .subscribe((res: any) => {
        console.log(res);
        console.log(res.meetings);
        this.meetings = res.meetings;
        // for (let i = 0; i < res.meetings.length; i++) {
        //   this.meetings.push({
        //     title: `${res.meetings[i].title} Start:${res.meetings[i].start} End:${res.meetings[i].end}`,
        //     date: res.meetings[i].start.slice(0, 10),
        //   });
        // }
        console.log(res.meetings[0].start.slice(0, 10));
        console.log(this.meetings);
        this.calendarOptions.events = this.meetings;
      });
  }

  // eventClicked( event:any ): void {

  //   console.log('Event clicked:', event);
    
  // }
  // onDateClick(res: { dateStr: string }) {
  //   alert('you clicked on :' + res.dateStr);
  // }

  openDialog(res: { dateStr: string }) {
    const dialogRef = this.dialog.open(CreatemeetingComponent, {
      data: { res },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogBox(data:any) {
    const dialogRef = this.dialog.open(CreatemeetingComponent, {data});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
 }
