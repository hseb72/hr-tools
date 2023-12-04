import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { ReasonService } from '../services/reason.service';
import { VacationService } from '../services/vacation.service';
import { WorkflowService } from '../services/workflow.service';
import { EmployeeService } from '../services/employee.service';

import { Vacation } from '../../core/models/vacation';

declare var $: any;
const EMPTY_USER = { id: 0, email: '', firstName: '', lastName: '' };

@Input() ;

@Component({
  selector: 'app-vaclist',
  templateUrl: './vac-list.component.html',
  styleUrls: ['./vac-list.component.scss'],
  providers: [DatePipe]
})

export class VacListComponent implements OnInit {
  currentUser;
  vacationUser;

  workflow = '1' ;
  vacations = [] ;
  filterVacs = [] ;
  employees = [] ;

  today: string;
  prevyear: string;
  thisyear: string;
  nextyear: string;

  vacNewForm: FormGroup;
  reasonRefs: [] = [] ;
  WFStepRefs: [] = [];
  WFStatusRefs: [] = [];
  WFSIcons = [ '', 'fa-wrench', 'fa-envelope', 'fa-check green', 'fa-times red', 'fa-trash', 'fa-trash', 'fa-trash' ] ;

  loading = false;
  submitted = false;
  returnUrl: string ='/' ;
  error = '';
  success = '' ;
  id: string = '';

  constructor(
    private commonModule: CommonModule,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private reasonService: ReasonService,
    private workflowService: WorkflowService,
    private employeeService: EmployeeService,
    private vacationService: VacationService
  ) {
    var user = localStorage.getItem('user') ;
    if ( ! user ) { user = JSON.stringify(EMPTY_USER) ; }
    this.currentUser = JSON.parse (user);
    this.vacationUser = this.currentUser ;

    registerLocaleData(localeFr, 'fr-FR');
    this.today = '' + this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.prevyear = (parseInt('' + this.datePipe.transform(Date.now(), 'yyyy')) -1).toString() ;
    this.thisyear = parseInt('' + this.datePipe.transform(Date.now(), 'yyyy')).toString() ;
    this.nextyear = (parseInt('' + this.datePipe.transform(Date.now(), 'yyyy')) +1).toString() ;

    this.vacNewForm = this.formBuilder.group({
      start: [this.today, Validators.required],
      afternoon: [false],
      end: [this.today, Validators.required],
      morning: [false],
      reason: ['', Validators.required],
      otherreason: ['']
    });
/*
    this.prevyear = this.datePipe.transform(Date.now(), 'yyyy') -1;
    this.nextyear = this.datePipe.transform(Date.now(), 'yyyy'+1);
    this.prevyear = "2020";
    this.thisyear = this.datePipe.transform(Date.now(), 'yyyy') ;
    this.nextyear = "2022";
*/
}

  ngOnInit() {

    this.reasonService.getAll().pipe(first()).subscribe(reasons => {
      this.reasonRefs = JSON.parse(JSON.stringify(reasons)) ;
    });

    this.workflowService.getStatus(this.workflow).pipe(first()).subscribe(wrk => {
      this.WFStatusRefs = JSON.parse(JSON.stringify(wrk)) ;
    });

    this.workflowService.getSteps(this.workflow).pipe(first()).subscribe(wrk => {
      this.WFStepRefs = JSON.parse(JSON.stringify(wrk)) ;
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/vacation' ;
    this.returnUrl = this.returnUrl.replace(/^\//, '') ;

    this.refresh() ;
  }

  refresh() {
    this.employeeService.getVacation(this.currentUser.id).pipe(first()).subscribe(vacs => {
      this.vacations = JSON.parse(JSON.stringify(vacs)).reverse();
      this.filterVacs = this.vacations.filter((vac: Vacation) => vac.enddate >= (this.prevyear) && vac.startdate <= this.nextyear );
      this.filterVacs = this.vacations ;
    });
  }

  get f() { return this.vacNewForm.controls; }

  switchFilters () {
    if ( $( '.filterBox' ) . css ( 'display' ) === 'none' ) {
      $( '.filterBox' ) . css ( 'display', 'table-row' ) ;
      $( '.noFilterBox' ) . css ( 'display', 'none' ) ;
    } else {
      $( '.filterBox' ) . css ( 'display', 'none' ) ;
      $( '.noFilterBox' ) . css ( 'display', 'table-row' ) ;
    }
  }

/*
  deleteVacations() {
    this.vacations.forEach(function(e) {
        if ( $( '#del' + e.id ) . is ( ':checked' ) ) {
          this.vacationService.deleteVacation( e.id ).subscribe(vacs => {
            this.refresh() ;
          });
        }
    }.bind(this));
  }
*/
  deleteVacation( id: string ) {
    this.vacationService.deleteVacation( id ).subscribe(vacs => {
      this.refresh() ;
    });
  }

  updateVacation( id: string, ids: string ) {
    this.vacationService.submitVacation( id, ids ).subscribe(vacs => {
      this.refresh() ;
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.vacNewForm.invalid) {
        return;
    }

    this.loading = true;

    const san = this . f ['afternoon'] . value === false ? 0 : 1 ;
    const ebn = this . f ['morning'] . value === false ? 0 : 1 ;

    const content = '{ "employee": "' + this.currentUser.id +
            '", "startdate": "' + this . f ['start'] . value +
            '", "startafternoon": "' + san +
            '", "enddate": "' + this . f ['end'] . value +
            '", "endbeforenoon": "' + ebn +
            '", "reason": "' + this . f ['reason'] . value +
            '", "otherreason": "' + this . f ['otherreason'] . value +
            '", "status": "1" }' ;

    this.vacationService.putVacation(content).subscribe(
      data => {
          this.switchFilters () ;
          this.refresh() ;
          this.loading = false;
        },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  showHiddenVacs() {
    $( 'tr.diswst-unneeded' ) . css ( 'display', 'table-row') ;
    $( 'i.diswst-unneeded' ) . css ( 'display', 'inline') ;
    $( '.diswst-needed' ) . css ( 'display', 'none') ;
  }

  hideVisibleVacs() {
    $( '.diswst-needed' ) . css ( 'display', 'inline') ;
    $( '.diswst-unneeded' ) . css ( 'display', 'none') ;
  }
}