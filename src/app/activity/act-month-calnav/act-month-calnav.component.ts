import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-act-month-calnav',
  templateUrl: './act-month-calnav.component.html',
  styleUrls: ['./act-month-calnav.component.scss']
})
export class ActMonthCalnavComponent implements OnInit {
  @Input() monthNames!: string[];

  year: number = 1899;
  month: number = 12;

  prevyear: number = 1899;
  prevmonth: number = 12;
  
  nextyear: number = 1900;
  nextmonth: number = 2;

  constructor(
    private activatedroute:ActivatedRoute
  ) {
    this.activatedroute.params.subscribe(
      routeParams => {
        this . year = routeParams [ 'year' ] ;
        this . month = routeParams [ 'month' ] ;
        this . refresh () ;
      }) ;
  }

  ngOnInit(): void {
  }

  refresh () {
    this.prevyear=+this.year;
    this.prevmonth=+this.month-1;

    this.nextyear=+this.year;
    this.nextmonth=+this.month+1;

    if ( this . prevmonth == 0 ) {
      this.prevyear =  +this.year -1 ;
      this.prevmonth = 12 ;
    } else if ( this . nextmonth == 13 ) {
      this.nextyear = +this.year +1 ;
      this.nextmonth = 1 ;
    }  
  }
}
