import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

/*
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
*/

import { Today } from '../../core/models/today'
import * as XLSX from 'xlsx';

import { PubholidayService } from '../services/pubholiday.services';

@Component({
  selector: 'app-act-cal',
  templateUrl: './act-cal.component.html',
  styleUrls: ['./act-cal.component.scss'],
  providers: [ DatePipe ]
})
export class ActCalComponent implements OnInit {
  today: string;
  todayyear: string;
  todaymonth: string;

  year: string = "1900";
  month: string = "01" ;
  week: string = "01" ;
  weekday: string = "Monday";

  prevyear: number;
  curryear: number;
  nextyear: number;

  weekdays = [ 1, 2, 3, 4, 5, 6, 7 ];
  weekdayHeads = [ 'Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa' ] ;
  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;
  monthdays = [] ;

  calendar: any[] = [[]] ;
  holidays: any[] = [] ;
  holilist: any[string] = [] ;

/*
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
*/

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private pubholidayService: PubholidayService
  ) {
  
      registerLocaleData(localeFr, 'fr-FR');

    this.today = (this.datePipe.transform(Date.now(), 'yyyy-MM-dd') || '');
    this.todayyear = (this.datePipe.transform(Date.now(), 'yyyy') || '');
    this.todaymonth = (this.datePipe.transform(Date.now(), 'M') || '');
    this.week = (this.datePipe.transform(Date.now(), 'ww') || '');

    this.curryear = +this.todayyear ;
    this.route.queryParams.subscribe(params => {
      if ( +params['year'] > 2000 && +params['year'] < 3000)
        this.curryear = +params['year'] ;
    });

    this.prevyear = +this.curryear - 1 ;
    this.nextyear = +this.curryear + 1 ;
  }

  ngOnInit() {
    var mo = 0 ;
    var first, last ;

    while ( mo < 12 ) {
      first = new Date (this.curryear, mo, 1, 0, 0, 0) ;
      last = new Date (this.curryear, mo+1, 0, 0, 0, 0) ;

  //      console.log ('First Day of ' + mo + ' : ' + first.getDay() ) ;
  //      console.log ('Last Day of ' + mo + ' : ' + last.getDate() ) ;

      var d = 0 ;
      var tab = [];
      while ( d < first.getDay() ) { tab [d] = '' ; d++ ; }
      while ( d < first.getDay() + last.getDate() ) { tab [d] = d - first.getDay() + 1 ; d++ ; }
      while ( d < 42 ) { tab [d] = '' ; d++ ; }

      this . calendar [ mo ] = tab ;
      mo++;
    }

    this.refresh() ;
  }

  refresh() {
    //    console.log('in refresh');
    this.pubholidayService
    .getRange ( this . curryear, null, null )
    .pipe(first())
    .subscribe(
      hol => {
        this.holidays = JSON.parse(JSON.stringify(hol));

        this.holidays = this.holidays
        .sort( function(a: any, b: any) {
          let am = ( +a.month < 10 ? "0" : "" ) ;
          let bm = ( +b.month < 10 ? "0" : "" ) ;
          let ad = ( +a.day < 10 ? "0" : "" ) ;
          let bd = ( +b.day < 10 ? "0" : "" ) ;
          return ( a.year + am + a.month + ad + a.day >= b.year + bm + b.month + bd + b.day ? 1 : -1 );
          return ( a.year + '/' + a.month + '/' + a.day >= b.year + '/' + b.month + '/' + b.day ? 1 : -1 );
        })
        . filter ( (e: any) => ( +e.year === this . curryear ) ) ;
        console.log ( this.holidays) ;

        let templist:any [string] = [] ;
        this.holidays.forEach(function(e: any){
          let d = e.day ; 
          let m = e.month ;
          let y = e.year ; 
          let s: string = y + '-' + m + '-' + d ;

          templist[s]=1;
        });
        this.holilist=templist;
      });
  }

  setNewHoliday (day: number, month: number) {
    let holiday = this.curryear + "-" + ( month+1 ) + "-" + day ;

    const content = '{ "day": "' + holiday + '", "reason": "To be set" }' ;

    this . pubholidayService . putPubholiday ( content )
    . subscribe (
      data => {
        this . refresh () ;
      }
    );
  }

  unsetHoliday (id: string) {
    this . pubholidayService . deletePubholiday ( id )
    . subscribe (
      data => {
        this . refresh () ;
      }
    );
  }

  updateHoliday (id: string) {
    let lid = 'i_' + id ;
    let val = ( <HTMLInputElement>document.getElementById( lid ) ).value;

    let content = '{ "reason": "' + val + '" }' ;

    this . pubholidayService . patchPubholiday ( id, content )
    . subscribe (
      data => {
        this . refresh () ;
      }
    );
  }

  hasChanged (id: string) {
    let lid = 'i_' + id ;
    let e = document . getElementById ( lid ) ;
    if ( e ) e . className = 'changed' ;
  }

  matAutocomplete () {
    
  }
}