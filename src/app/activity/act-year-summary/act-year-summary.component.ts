import { Component, OnInit, Input } from '@angular/core';
import { ActreportService } from '../services/actreport.services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-act-year-summary',
  templateUrl: './act-year-summary.component.html',
  styleUrls: ['./act-year-summary.component.scss'],
  providers: [DatePipe]
})
export class ActYearSummaryComponent implements OnInit {
  @Input() year!: number;
  
  currentUser: any = 0;
  
  actReports: string[] = [] ;
  actReportsPrevYear: string[] = [] ;

  displayedColumns: string[] = ['month', 'monthname', 'workeddays', 'offdays', 'status'];

  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;
  statusNames = [ '', '', '', '', '', '', '', '', '', "à soumettre", "validé", "en retard", "à corriger" ];
  statusIcons = [ '', '', '', '', '', '', '', 'assignment', "assignment", "assignment_turned_in", "assignment_late", "assignment_return", '' ];
  statusColors = [ '', '', '', '', '', '', '', 'accent', 'primary', "primary", "warn", "accent", "" ];

    constructor(
    private actreportService: ActreportService,
    private datePipe: DatePipe
  ) {
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;
   }

  ngOnInit(): void {
    this . actreportService
    . getUserYear ( this . currentUser, this . year )
    . subscribe ( acr => {
      this . actReports = JSON . parse ( JSON . stringify ( acr ) ) ; 
      console.log (this.actReports)
    })
  }
}
