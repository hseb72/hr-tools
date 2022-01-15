import { Component, OnInit } from '@angular/core';
import { ActreportService } from '../services/actreport.services';
import { DatePipe } from '@angular/common';
import { Today } from '../../core/models/today'

@Component({
  selector: 'app-act-year-summary',
  templateUrl: './act-year-summary.component.html',
  styleUrls: ['./act-year-summary.component.scss'],
  providers: [DatePipe]
})
export class ActYearSummaryComponent implements OnInit {
  currentUser: any = 0;
  
  actReports: string[] = [] ;

  displayedColumns: string[] = ['month', 'monthname', 'workeddays', 'offdays', 'status'];

  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;
  statusNames = [ '', '', '', '', '', '', '', '', '', "à soumettre", "validé", "en retard", "à corriger" ];
  statusIcons = [ '', '', '', '', '', '', '', '', '', "assignment", "assignment_turned_in", "assignment_late", "assignment_return" ];
  statusColors = [ '', '', '', '', '', '', '', '', '', "accent", "primary", "warn", "warn" ];

  today: Today = { "date": "1900-01-01", "year": "1900", "month": "01", "day": "01", "week": "01", "weekday": "1" };

  constructor(
    private actreportService: ActreportService,
    private datePipe: DatePipe
  ) {
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;

    this.today.date = "" + this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.today.year = "" + this.datePipe.transform(Date.now(), 'yyyy');
    this.today.month = "" + this.datePipe.transform(Date.now(), 'M');
    this.today.week = "" + this.datePipe.transform(Date.now(), 'ww');
    this.today.weekday = "" + this.datePipe.transform(Date.now(), 'w');
   }

  ngOnInit(): void {
    this . actreportService
    . getUserYear ( this . currentUser, this . today . year )
    . subscribe ( acr => {
      this . actReports = JSON . parse ( JSON . stringify ( acr ) ) ; 
      console.log (this.actReports)
    })
  }

}
