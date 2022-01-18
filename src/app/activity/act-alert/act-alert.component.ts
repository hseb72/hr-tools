import { Component, OnInit } from '@angular/core';
import { ActreportService } from '../services/actreport.services';

@Component({
  selector: 'app-act-alert',
  templateUrl: './act-alert.component.html',
  styleUrls: ['./act-alert.component.scss']
})
export class ActAlertComponent implements OnInit {
  currentUser: any = 0;

  actReports: any[] = [] ;

  monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ] ;
  statusNames = [ '', '', '', '', '', '', '', '', '', "à soumettre", "validé", "en retard", "à corriger" ];
  statusIcons = [ '', '', '', '', '', '', '', 'assignment', "assignment", "assignment_turned_in", "assignment_late", "assignment_return", '' ];
  statusColors = [ '', '', '', '', '', '', '', 'accent', 'primary', "primary", "warn", "accent", "" ];

  constructor(
    private actreportService: ActreportService
  ) {
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;
   }

  ngOnInit(): void {
    this . actreportService
    . getRequired ( this . currentUser )
    . subscribe ( acr => {
      this . actReports = JSON . parse ( JSON . stringify ( acr ) ) ; 
      console.log (this . actReports)
    })
  }

}
