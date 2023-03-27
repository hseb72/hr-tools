import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Today } from '../../core/models/today'

export interface MonthActivity {
  monthname: string;
  month: number;
  workdays: number;
  vacations: number;
  status: string;
}

@Component({
  selector: 'app-act-main',
  templateUrl: './act-main.component.html',
  styleUrls: ['./act-main.component.scss'],
  providers: [DatePipe]
})
export class ActMainComponent implements OnInit {
  
  today: Today = { "date": "1900-01-01", "year": "1900", "month": "01", "day": "01", "week": "01", "weekday": "1" };
  yearlist: number[] = [] ;

  constructor(
    private datePipe: DatePipe
  ) {
    this.today.date = "" + this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.today.year = "" + this.datePipe.transform(Date.now(), 'yyyy');
    this.today.month = "" + this.datePipe.transform(Date.now(), 'M');
    this.today.week = "" + this.datePipe.transform(Date.now(), 'ww');
    this.today.weekday = "" + this.datePipe.transform(Date.now(), 'c');

    this . yearlist [ 0 ] = +this.today.year ;
    if ( this . today . month <= '2' ) this . yearlist [ 1 ] = +this.today.year - 1
   }

  ngOnInit(): void {
  }

}
