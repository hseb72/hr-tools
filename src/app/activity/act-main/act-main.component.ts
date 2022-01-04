import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ActreportService } from '../services/actreport.services';

export interface PeriodicElement {
  monthname: string;
  month: number;
  workdays: number;
  vacations: number;
  status: string;
}

/*
const ELEMENT_DATA: PeriodicElement[] = [
  {month: 1, monthname: 'Janvier', workdays: 22, status: '_turned_in', vacations: 0},
  {month: 2, monthname: 'Février', workdays: 18, status: '_turned_in', vacations: 0},
  {month: 3, monthname: 'Mars', workdays: 20, status: '_turned_in', vacations: 0},
  {month: 4, monthname: 'Avril', workdays: 21, status: '_turned_in', vacations: 0},
  {month: 5, monthname: 'Mai', workdays: 20, status: '_turned_in', vacations: 0},
  {month: 6, monthname: 'Juin', workdays: 19, status: '_turned_in', vacations: 0},
  {month: 7, monthname: 'Juillet', workdays: 6, status: '_turned_in', vacations: 0},
  {month: 8, monthname: 'Août', workdays: 16, status: '_turned_in', vacations: 0},
  {month: 9, monthname: 'Septembre', workdays: 21, status: '_turned_in', vacations: 0},
  {month: 10, monthname: 'Octobre', workdays: 22, status: '_turned_in', vacations: 0},
  {month: 11, monthname: 'Novembre', workdays: 22, status: '_late', vacations: 0},
  {month: 12, monthname: 'Décembre', workdays: 22, status: '', vacations: 0},
];
*/

@Component({
  selector: 'app-act-main',
  templateUrl: './act-main.component.html',
  styleUrls: ['./act-main.component.scss'],
  providers: [DatePipe]
})
export class ActMainComponent implements OnInit {
  
  displayedColumns: string[] = ['month', 'monthname', 'workeddays', 'offdays', 'status'];
//  dataSource = ELEMENT_DATA;

  actReports: string[] = [] ;

  today ;
  todayyear ;
  todaymonth ;

  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;

  statusNames = [ '', '', '', '', '', '', '', '', '', "à soumettre", "validé", "en retard", "à corriger" ];
  statusIcons = [ '', '', '', '', '', '', '', '', '', "assignment", "assignment_turned_in", "assignment_late", "assignment_return" ];
  statusColors = [ '', '', '', '', '', '', '', '', '', "primary", "", "warn", "warn" ];

//  year ;
//  month ;
//  week ;
//  weekday ;

  constructor(
    private actreportService: ActreportService,
    private datePipe: DatePipe
  ) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.todayyear = this.datePipe.transform(Date.now(), 'yyyy');
    this.todaymonth = this.datePipe.transform(Date.now(), 'M');
   // this.week = this.datePipe.transform(Date.now(), 'ww');

   }

  ngOnInit(): void {
    this . actreportService
    . getAll ()
    . subscribe ( acr => {
      this . actReports = JSON . parse ( JSON . stringify ( acr ) ) ; 
    })
  }

}
