import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-act-month-summary',
  templateUrl: './act-month-summary.component.html',
  styleUrls: ['./act-month-summary.component.scss']
})
export class ActMonthSummaryComponent implements OnInit {
  @Input() statusNames!: string[];
  @Input() statusColors!: string[];
  @Input() statusIcons!: string[];
  @Input() year!: any;
  @Input() month!: any;
  @Input() reports!: any;
  @Input() report!: any;
  @Input() user!: any;

  displayedColumns: string[] = ['workeddays', 'offdays'];

  //reports: any[] = [] ;

  constructor() {
  }

  ngOnInit(): void {
    // this . reports . push ( this . report ) ;
    // console . log ( this .reports);
  }

}
