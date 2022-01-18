import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Today } from '../../core/models/today'

import { EmployeeService } from "../../core/services/employee.service"
import { ActreportService } from '../services/actreport.services';

@Component({
  selector: 'app-act-month',
  templateUrl: './act-month.component.html',
  styleUrls: ['./act-month.component.scss']
})

export class ActMonthComponent implements OnInit {
  currentUser: any = 0;

  empname: string = '' ;

  public reqyear: any = 1900 ;
  public reqmonth: any = 1 ;

  public report: any ;
  public employee: any;

  displayedColumns: string[] = ['workeddays', 'offdays'];
//  dataSource = ELEMENT_DATA;

  actReports: string[] = [] ;

  today: Today = { "date": "", "year": "", "month": "", "day": "", "week": "", "weekday": "" };

  dayNums = [ 'D', 'L', 'M', 'Me', 'J', 'V', 'S' ] ;
  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;
  statusNames = [ '', '', '', '', '', '', '', 'brouillon', "soumis", "validé", "en retard", "à corriger", "" ];
  statusIcons = [ '', '', '', '', '', '', '', 'assignment', "assignment", "assignment_turned_in", "assignment_late", "assignment_return", '' ];
  statusColors = [ '', '', '', '', '', '', '', 'accent', 'primary', "primary", "warn", "accent", "" ];


  constructor(
    private activatedroute:ActivatedRoute,
    private actreportService: ActreportService,
    private employeeService: EmployeeService
  ) {
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;

    this.activatedroute.params.subscribe(
      routeParams => {
        this.reqyear = routeParams [ 'year' ] ;
        this.reqmonth = routeParams [ 'month' ] ;

        this . actreportService
        . getUserMonth ( this . currentUser, this . reqyear, this . reqmonth) 
        . subscribe (
          rep => {
            this . report = rep ;
            this . actReports = JSON . parse ( '[ ' + ( JSON . stringify (rep) ) + ' ]' ) ;
    //        console.log (this . actReports);
          }); 
    });

    this . employeeService . getEmployee ( this . currentUser )
    . subscribe ( 
      emp => { 
        this . employee = emp ; 
      }
    );

  }

  ngOnInit(): void {
  }
}
