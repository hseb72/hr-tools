import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';

import { PubholidayService } from "../../core/services/pubholiday.service";
import { ActivityService } from '../services/activity.services'

type PHO = {
  id: number;
  year: number;
  month: number;
  day: number;
  reason: string;
  creation: Date;
  lastupdate: Date;
}

@Component({
  selector: 'app-act-month-upload',
  templateUrl: './act-month-upload.component.html',
  styleUrls: ['./act-month-upload.component.scss']
})
export class ActMonthUploadComponent implements OnInit {
  @Input() dayNums!: string[];
  @Input() user!: any;
  
  currentUser: any = 0;

  workBook!: XLSX.WorkBook;
  data: any ;
  activities: string [][] = [] ;
  savedActivities: any;

  pubholidays: PHO[] = [] ;
  phoArray: boolean [][][] = [] ;

  empname: string = "";

  year: number = 1900 ;
  month: number = 1 ;
  wrongYear: boolean = false ;

  firstLine: number = 8 ;
  firstColumn: number = 0 ;

  fileYear: number = 0 ;
  company: string = "Not Set" ;

  constructor(
    private activatedroute:ActivatedRoute,
    private pubholidayService: PubholidayService,
    private activityService: ActivityService,
    private snackBar: MatSnackBar
  ) { 
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;

    this.activatedroute.params
    .subscribe(
      routeParams => {
        this . year = routeParams [ 'year' ] ;
        this . month = routeParams [ 'month' ] ;
        if (this . workBook ) this . loadWorkSheet () ;
        this.getMonth();
      }
    ) ;
  }
  
  ngOnInit(): void {
    this . pubholidayService . getRange ( this . year, this . month, null)
    . subscribe (
      pho => {
        this . pubholidays = JSON . parse ( JSON . stringify (pho ) ) ;

        var phoa: boolean [] [] [] = [];
        this . pubholidays . forEach (function (e: any) {
//          console .log (e);
          if ( ! phoa [ e.year ] ) phoa [ e.year ] = [] ;
          if ( ! phoa [ e.year ] [ e.month ] ) phoa [ e.year ] [ e.month ] = []
          phoa [ e.year ] [ e.month ] [ e.day ] = true ;
        });
        this . phoArray = phoa ;
      }
    )
  }

  private getMonth() {
    this.activityService.getEmployeeMonthActivity(this.currentUser, this.year, this.month)
      .subscribe(
        act => {
          this.savedActivities = JSON.parse(JSON.stringify(act));
          console.log(this.savedActivities);
        }
      );
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      this . workBook = XLSX.read(ab);

      /* grab year sheet */
      const wsyc: XLSX.WorkSheet = this . workBook . Sheets['YearlyCalendar'];

      /* save data */
      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this . data = XLSX.utils.sheet_to_json(wsyc, {header: 1});
      this . fileYear = this . data [4][0] ;

      /* grab parameter sheet */
      const wpar: XLSX.WorkSheet = this . workBook . Sheets['Parametres'];

      /* save data */
      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this . data = XLSX.utils.sheet_to_json(wpar, {header: 1});
      this . company = this . data [2][2] ;
      this . empname = this . data [3][2] ;

      this . loadWorkSheet () ;
    }
    reader.readAsArrayBuffer(target.files[0]);
  }

  loadWorkSheet() {
    this . activities = [] ;
    this . wrongYear = false ;

    if ( this.fileYear != this.year ) { 
      this . snackBar . open ( "Le fichier ne correspond pas à l'année " + this . year, "Fermer");
      return ;
    }


    /* grab first sheet */
    const wsname: string = this . workBook . SheetNames[+this.month-1];
    const ws: XLSX.WorkSheet = this . workBook . Sheets[wsname];

    /* save data */
    //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
    this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
    console.log (this.data);
    /* Find first filled column */
    var i = 0 ;
    while ( i < 1000 && this . data [0][i] == undefined ) { i++ };
    this . firstColumn = i ;

    for ( var ind = 0 ; ind < 31 ; ind++ ) {
      i = ind + this . firstLine ;
      this . activities [ ind ] = [] ;

      const test = this . pubholidays . filter (
        a => { a . year == this . year && a . month == this . month && a . day == this . data [ i ][ this .firstColumn + 1 ] }
      );
      
      if ( test . length > 0 ) {
        this . activities [ ind ][ 7 ] = 'Jour Férié' ;
        this . activities [ ind ][ 9 ] = 'day-off' ;
      }

      this . activities [ ind ][ 0 ] = '' ;
      this . activities [ ind ][ 1 ] = this . user ;
      this . activities [ ind ][ 2 ] = "" + this . year ;
      this . activities [ ind ][ 3 ] = "" + this . month ;
      this . activities [ ind ][ 4 ] = this . data [ i ][ this .firstColumn + 1 ] ;
      this . activities [ ind ][ 5 ] = this . data [ i ][ this .firstColumn + 0 ] ;
      this . activities [ ind ][ 6 ] = '' + this . dayNums . indexOf ( this . data [ i ][ this .firstColumn +0 ] ) ;

      if ( this . data [ i ][ this .firstColumn + 2 ] )
        this . activities [ ind ][ 7 ] = this . data [ i ][ this .firstColumn + 2 ] ;
      this . activities [ ind ][ 8 ] = this . data [ i ][ this .firstColumn + 3 ] ;

      if ( this . data [ i ][ this .firstColumn + 0 ] == 'S' || this . data [ i ][ this .firstColumn +0 ] == 'D' )
        this . activities [ ind ][ 9 ] = 'day-off' ;

      if ( this . data [ i ][ this .firstColumn + 11 ] == '1' ) {
        this . activities [ ind ][ 7 ] = 'Congés payés' ;
        this . activities [ ind ][ 8 ] = '1' ;
      } else if ( this . data [ i ][ this .firstColumn + 11 ] == '0.5' ) {
        this . activities [ ind ][ 7 ] += ' / Congés payés' ;
        this . activities [ ind ][ 8 ] += ' / 0.5' ;
      }
    }
  }

  onFileChange2(evt: any) {
      /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[+this.month-1];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
//      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
      this . empname = this . data [1][3] ;
      
      for ( var i = 6 ; i < 39 ; i++ ) {
        this . activities [ i-6 ] = [] ;

        if ( this . phoArray [ this . year ][ this . month ][ this . data [ i ][ 1 ] ] ) {
          this . activities [ i-6 ][ 7 ] = 'Jour Férié' ;
          this . activities [ i-6 ][ 9 ] = 'day-off' ;
        }

        this . activities [ i-6 ][ 0 ] = '' ;
        this . activities [ i-6 ][ 1 ] = this . currentUser ;
        this . activities [ i-6 ][ 2 ] = "" + this . year ;
        this . activities [ i-6 ][ 3 ] = "" + this . month ;
        this . activities [ i-6 ][ 4 ] = this . data [ i ][ 1 ] ;
        this . activities [ i-6 ][ 5 ] = this . data [ i ][ 0 ] ;
        this . activities [ i-6 ][ 6 ] = '' + this . dayNums . indexOf ( this . data [ i ][ 0 ] ) ;
        if ( this . data [ i ][ 2 ] )
          this . activities [ i-6 ][ 7 ] = this . data [ i ][ 2 ] ;
        this . activities [ i-6 ][ 8 ] = this . data [ i ][ 3 ] ;

        if ( this . data [ i ][ 0 ] == 'S' || this . data [ i ][ 0 ] == 'D' )
          this . activities [ i-6 ][ 9 ] = 'day-off' ;

        if ( this . data [ i ][ 11 ] != null ) {
          this . activities [ i-6 ][ 7 ] = 'Congés payés' ;
          this . activities [ i-6 ][ 8 ] = '1' ;
        }
      }
//      console.log(this.data);
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  uploadMonth() {
    var jActivities: string = '[' ;
    var comma = "" ;
    
    for ( var ind = 0 ; ind < 31 ; ind++ ) {
      if ( this . activities [ ind ][ 8 ] != undefined ) {
        jActivities += comma + '{' ;
        jActivities += '"employee" : ' + this . currentUser + ',' ;
        jActivities += '"year" : ' + this . year + ',' ;
        jActivities += '"month" : ' + this . month + ',' ;
        jActivities += '"day" : ' + this . activities [ ind ][ 4 ] + ',' ;
        jActivities += '"weekday" : "' + this . activities [ ind ][ 5 ] + '",' ;
        jActivities += '"project" : "' + this . activities [ ind ][ 7 ] + '",' ;
        jActivities += '"quantity" : ' + this . activities [ ind ][ 8 ] ;
        jActivities += '}' ;
        comma = ', ' ;
      }
    }

    jActivities += ']' ;

    this . activityService . uploadActivity ( jActivities ) 
    .subscribe (
      act => {
        this . savedActivities = JSON . parse ( JSON . stringify ( act ) ) ;
      }
    );
  }

  findSavedActivity ( day: number ): any {
    console . log (day);
    return (
      ( this . savedActivities . find ((obj: any) => ( +obj . day == day )) || "" )
    );
  }
}
