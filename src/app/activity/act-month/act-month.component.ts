import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

import { Today } from '../../core/models/today'

import { ActreportService } from '../services/actreport.services';
import { EmployeeService } from "../../core/services/employee.service"
import { PubholidayService } from "../../core/services/pubholiday.service"

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
  selector: 'app-act-month',
  templateUrl: './act-month.component.html',
  styleUrls: ['./act-month.component.scss']
})

export class ActMonthComponent implements OnInit {

  data: any ;
  activities: string [][] = [] ;
  commands: string [] = [] ;

  pubholidays: PHO[] = [] ;
  phoArray: boolean [][][] = [] ;

  empname: string = '' ;

  public reqyear: any = 1900 ;
  public reqmonth: any = 1 ;

  public report: any ;
  currentUser: any = 0;
  public employee: any;

  displayedColumns: string[] = ['workeddays', 'offdays'];
//  dataSource = ELEMENT_DATA;

  actReports: string[] = [] ;

  today: Today = { "date": "", "year": "", "month": "", "day": "", "week": "", "weekday": "" };

  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;
  dayNums = [ 'D', 'L', 'M', 'Me', 'J', 'V', 'S' ] ;

  statusNames = [ '', '', '', '', '', '', '', '', '', "à soumettre", "validé", "en retard", "à corriger" ];
  statusIcons = [ '', '', '', '', '', '', '', '', '', "assignment", "assignment_turned_in", "assignment_late", "assignment_return" ];
  statusColors = [ '', '', '', '', '', '', '', '', '', "accent", "primary", "warn", "warn" ];

  constructor(
    private activatedroute:ActivatedRoute,
    private actreportService: ActreportService,
    private employeeService: EmployeeService,
    private pubholidayService: PubholidayService
  ) {
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;

    this.reqyear=this.activatedroute.snapshot.paramMap.get("year");
    this.reqmonth=this.activatedroute.snapshot.paramMap.get("month");

    this . employeeService . getEmployee ( this . currentUser )
    . subscribe ( 
      emp => { 
        this . employee = emp ; 
      }
    );

    this . pubholidayService . getRange ( this . reqyear, this . reqmonth, null)
    . subscribe (
      pho => {
        this . pubholidays = JSON . parse ( JSON . stringify (pho ) ) ;
        var phoa:boolean [] [] [] = [];
        this . pubholidays . forEach (function (e) {
          console .log (e);
          if ( ! phoa [ e.year ] ) phoa [ e.year ] = [] ;
          if ( ! phoa [ e.year ] [ e.month ] ) phoa [ e.year ] [ e.month ] = []
          phoa [ e.year ] [ e.month ] [ e.day ] = true ;
        });
        this . phoArray = phoa ;
        console .log (this . phoArray);
      }
    )

    this . actreportService
    . getUserMonth ( this . currentUser, this . reqyear, this . reqmonth) 
    . subscribe (
      rep => {
        this . report = rep ;
        this . actReports = JSON . parse ( '[ ' + ( JSON . stringify (rep) ) + ' ]' ) ;
//        console.log (this . actReports);
      }); 
  }

  ngOnInit(): void {
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
      const wsname: string = wb.SheetNames[this.reqmonth-1];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
//      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
      this . empname = this . data [1][3] ;
      
      for ( var i = 6 ; i < 39 ; i++ ) {
        this . activities [ i-6 ] = [] ;

        if ( this . phoArray [ this . reqyear ][ this . reqmonth ][ this . data [ i ][ 1 ] ] ) {
          this . activities [ i-6 ][ 7 ] = 'Jour Férié' ;
          this . activities [ i-6 ][ 9 ] = 'day-off' ;
        }

        this . activities [ i-6 ][ 0 ] = '' ;
        this . activities [ i-6 ][ 1 ] = this . currentUser ;
        this . activities [ i-6 ][ 2 ] = this . reqyear ;
        this . activities [ i-6 ][ 3 ] = this . reqmonth ;
        this . activities [ i-6 ][ 4 ] = this . data [ i ][ 1 ] ;
        this . activities [ i-6 ][ 5 ] = this . data [ i ][ 0 ] ;
        this . activities [ i-6 ][ 6 ] = '' + this . dayNums . indexOf ( this . data [ i ][ 0 ] ) ;
        if ( this . data [ i ][ 2 ] )
          this . activities [ i-6 ][ 7 ] = this . data [ i ][ 2 ] ;
        this . activities [ i-6 ][ 8 ] = this . data [ i ][ 3 ] ;

        if ( this . data [ i ][ 0 ] == 'S' || this . data [ i ][ 0 ] == 'D' )
          this . activities [ i-6 ][ 9 ] = 'day-off' ;

        if ( this . data [ i ][ 11 ] != null ) {
          this . activities [ i-6 ][ 7 ] = 'Congés payés' ;
          this . activities [ i-6 ][ 8 ] = '1' ;
        }

        if ( this . phoArray [ this . reqyear ][ this . reqmonth ][ this . data [ i ][ 1 ] ] )
        this . activities [ i-6 ][ 9 ] = 'day-off' ;

      /*
        if ( this . data [ i ][ 14 ] != null ) {
          this . activities [ i-6 ][ 7 ] = 'Férié' ;
          this . activities [ i-6 ][ 9 ] = 'day-off' ;
        }
*/
      }
      console.log(this.data);
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

}
