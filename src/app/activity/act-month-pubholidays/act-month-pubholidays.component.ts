import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PubholidayService } from "../../core/services/pubholiday.service"

@Component({
  selector: 'app-act-month-pubholidays',
  templateUrl: './act-month-pubholidays.component.html',
  styleUrls: ['./act-month-pubholidays.component.scss']
})
export class ActMonthPubholidaysComponent implements OnInit {

  @Input() monthNames!: string[];
  
  year: number = 1900 ;
  month: number = 1 ;

  pubholidays: any;
  displayedColumns = [ "day", "reason"] ;

  constructor(
    private activatedroute:ActivatedRoute,
    private pubholidayService: PubholidayService
  ) { 
    this.activatedroute.params
    .subscribe(
      routeParams => {
        this . year = routeParams [ 'year' ] ;
        this . month = routeParams [ 'month' ] ;
        this . refresh() ;
      }
    ) ;
}

  ngOnInit(): void {
  }

  refresh(): void {
    this . pubholidayService . getRange ( this . year, this . month, null)
    . subscribe (
      pho => {
        this . pubholidays = JSON . parse ( JSON . stringify (pho ) ) ;
      }
    )
  }

}
