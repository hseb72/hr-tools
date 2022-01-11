import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

import { Today } from '../../core/models/today'

import { ActreportService } from '../services/actreport.services';
import { EmployeeService } from "../../core/services/employee.service"

@Component({
  selector: 'app-act-month',
  templateUrl: './act-month.component.html',
  styleUrls: ['./act-month.component.scss']
})
export class ActMonthComponent implements OnInit {

  data: any ;

  public reqyear: any = 1900 ;
  public reqmonth: any = 1 ;

  public report: any ;
  public currentUser: any = 0;
  public employee: any;

  displayedColumns: string[] = ['workeddays', 'offdays'];
//  dataSource = ELEMENT_DATA;

  actReports: string[] = [] ;

  today: Today = { "date": "", "year": "", "month": "", "day": "", "week": "" };

  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;

  statusNames = [ '', '', '', '', '', '', '', '', '', "à soumettre", "validé", "en retard", "à corriger" ];
  statusIcons = [ '', '', '', '', '', '', '', '', '', "assignment", "assignment_turned_in", "assignment_late", "assignment_return" ];
  statusColors = [ '', '', '', '', '', '', '', '', '', "accent", "primary", "warn", "warn" ];

  constructor(
    private activatedroute:ActivatedRoute,
    private actreportService: ActreportService,
    private employeeService: EmployeeService
  ) {
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;

    this . employeeService . getEmployee ( this . currentUser )
    . subscribe ( 
      emp => { 
        this . employee = emp ; 
      }
    );
  }

  ngOnInit(): void {
    this.reqyear=this.activatedroute.snapshot.paramMap.get("year");
    this.reqmonth=this.activatedroute.snapshot.paramMap.get("month");

    this . actreportService
    . getOne ( this . currentUser, this . reqyear, this . reqmonth) 
    . subscribe (
      rep => {
        this . report = rep ;
        this . actReports = JSON . parse ( '[ ' + ( JSON . stringify (rep) ) + ' ]' ) ;
        console.log (this . actReports);
      }); 
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
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

}
