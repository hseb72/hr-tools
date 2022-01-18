import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';

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
  selector: 'app-act-month-upload',
  templateUrl: './act-month-upload.component.html',
  styleUrls: ['./act-month-upload.component.scss']
})
export class ActMonthUploadComponent implements OnInit {
  @Input() dayNums!: string[];
  @Input() monthNames!: string[];
  @Input() statusColors!: string[];
  @Input() statusIcons!: string[];
  @Input() year!: any;
  @Input() month!: any;
  @Input() user!: any;
  @Input() report!: any;
  
  data: any ;
  activities: string [][] = [] ;
  pubholidays: PHO[] = [] ;
  phoArray: boolean [][][] = [] ;

  empname: string = "Lalaland";

  constructor(
    private pubholidayService: PubholidayService
  ) {
  }

  ngOnInit(): void {
    this . pubholidayService . getRange ( this . year, this . month, null)
    . subscribe (
      pho => {
        this . pubholidays = JSON . parse ( JSON . stringify (pho ) ) ;
        var phoa:boolean [] [] [] = [];
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

  onFileChange(evt: any) {
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

        if ( this . phoArray [ this . year ][ this . month ][ this . data [ i ][ 1 ] ] ) {
          this . activities [ i-6 ][ 7 ] = 'Jour Férié' ;
          this . activities [ i-6 ][ 9 ] = 'day-off' ;
        }

        this . activities [ i-6 ][ 0 ] = '' ;
        this . activities [ i-6 ][ 1 ] = this . user ;
        this . activities [ i-6 ][ 2 ] = this . year ;
        this . activities [ i-6 ][ 3 ] = this . month ;
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
      }
//      console.log(this.data);
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
}
