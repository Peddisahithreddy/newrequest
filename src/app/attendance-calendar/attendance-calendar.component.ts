import { Component, Injectable, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarView } from 'angular-calendar';
import { startOfYear,subYears } from 'date-fns';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { HolidayService } from '../holiday.service';

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class AttendanceCalendarComponent implements OnInit {
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  view: CalendarView = CalendarView.Month;
  viewDate: Date =new Date();
  events: CalendarEvent[] = [];
refresh!: Subject<any>;
route: ActivatedRoute = inject(ActivatedRoute)
  employeeId = -1
  constructor(private router: Router,private holidyService: HolidayService) {
    this.employeeId = Number(this.route.snapshot.params['emp_id'])
  }
  ngOnInit(): void {
    this.holidyService.get_holiday().subscribe((response) => {console.log("Holdiay response is:",response)})
     this.events =this.getHardcodedHolidays();

  }
  private getHardcodedHolidays(): CalendarEvent[] {
    // Hardcoded list of public holidays (example)
    const holidays: CalendarEvent[] = [
      {
        start: new Date('2023-01-01'),
        title: 'New Year\'s Day',
        allDay: true,
        meta: { type: 'public-holiday' },
      },
      {
        start: new Date('2023-07-04'),
        title: 'Independence Day',
        allDay: true,
        meta: { type: 'public-holiday' },
      },
      // Add more holidays as needed
    ];

    return holidays;
  }
  onsave2(){

    this.router.navigate(['/login']);
    }
    showNotification() {
      this.details = !this.details
      if (this.details == true)
      {
        const admindetails = document.getElementById('admin-details') as HTMLDivElement;
        admindetails.style.display = 'block';
      }
      else{
        this.hideNotification();
      }

    }
 hideNotification() {
   // Hide the notification box
   const admindetails = document.getElementById('admin-details') as HTMLDivElement;
   admindetails.style.display = 'none';
 }

}
