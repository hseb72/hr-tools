import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import { ActivityService } from '../services/activity.services'
import { PubholidayService } from "../../core/services/pubholiday.service";

type PHO = {
  id: number;
  year: number;
  month: number;
  day: number;
  reason: string;
  creation: Date;
  lastupdate: Date;
}

export interface DialogData {
  day: number;
  project: string;
  type: number; /* 0: day, 1: week, 2: month */
}

@Component({
  selector: 'app-act-month-current',
  templateUrl: './act-month-current.component.html',
  styleUrls: ['./act-month-current.component.scss'],
  providers: [DatePipe]
})
export class ActMonthCurrentComponent implements OnInit {

  @Input() dayNums!: string[];
  @Input() user!: any;
  
  currentUser: any = 0;

  year: number = 1900 ;
  month: number = 1 ;

  savedActivities: any[] = [];
  dispActivities: any[] = [];

  dispdays = [ 'D', 'L', 'M', 'Me', 'J', 'V', 'S' ] ;
  pubholidays: PHO[] = [] ;
  phoArray: boolean [][][] = [] ;

  constructor(
    private activatedroute:ActivatedRoute,
    private activityService: ActivityService,
    private dialog: MatDialog,
    private pubholidayService:PubholidayService,
    private datePipe: DatePipe
  ) { 
    var user = localStorage.getItem('user') ;
    if (user) this . currentUser = JSON.parse(user) . id ;

    this.activatedroute.params
    .subscribe(
      routeParams => {
        this . year = routeParams [ 'year' ] ;
        this . month = routeParams [ 'month' ] ;
        this . getPubholidays();
        this . getMonth();
      }
    ) ;
  }

  ngOnInit(): void {
  }

  private getPubholidays() {
    this.pubholidayService.getRange(this.year, this.month, null)
      .subscribe(
        pho => {
          this.pubholidays = JSON.parse(JSON.stringify(pho));

          var phoa: boolean[][][] = [];
          this.pubholidays.forEach(function (e: any) {
            if (!phoa[e.year])
              phoa[e.year] = [];
            if (!phoa[e.year][e.month])
              phoa[e.year][e.month] = [];
            phoa[e.year][e.month][e.day] = true;
          });
          this.phoArray = phoa;
        }
      );
  }

  openDialog(day: number, project: string, type: number): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {day: day, project: project, type: type},
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed with : ' + JSON . stringify (result));
      if ( +result.type === 0 ) this . dispActivities [ result.day ] . project = result . project ;
      else if ( +result . type === 1 ) {
        /* parce que le dimanche vaut 0 mais que les semaines commencent lundi */
        var offset, days ;
        if ( +this . dispActivities [ result.day ] . weekday == 0 ) { offset = 6 ; days = 7 ; }
        else if ( +this . dispActivities [ result.day ] . weekday == 6 ) { offset = 5 ; days = 6 ; }
        else { offset = this . dispActivities [ result.day ] . weekday - 1 ; days = 5 ; }
        console . log ( this . dispActivities [ result.day ] . weekday );
        console . log ( offset );
        for ( var i=0; i<days ; i++ ) {
          this . dispActivities [ result.day + i - offset ] . project = result . project ;
        }
      }
      else if ( +result . type === 2 ) {
        var withSunday = false, withSaturday = false ;
        if ( +this . dispActivities [ result.day ] . weekday == 0 ) withSunday = withSaturday = true ;
        if ( +this . dispActivities [ result.day ] . weekday == 6 ) withSaturday = true ;
        for ( var i=0; i<31 ; i++ ) {
          if ( +this . dispActivities [ i ] . weekday == 0 && ! withSunday ) continue ;
          if ( +this . dispActivities [ i ] . weekday == 6 && ! withSaturday ) continue ;
          this . dispActivities [ i ] . project = result . project ;
        }
      }
    });
  }

  uploadMonth() {
    var jActivities: string = '[' ;
    var comma = "" ;
    
    for ( var ind = 0 ; ind < 31 ; ind++ ) {
      if ( this . dispActivities [ ind ] . project != undefined && this . dispActivities [ ind ] . quantity != undefined ) {
        jActivities += comma + '{' ;
        jActivities += '"employee" : ' + this . currentUser + ',' ;
        jActivities += '"year" : ' + this . year + ',' ;
        jActivities += '"month" : ' + this . month + ',' ;
        jActivities += '"day" : ' + this . savedActivities [ ind ] + ',' ;
        jActivities += '"project" : "' + this . savedActivities [ ind ] . project + '",' ;
        jActivities += '"quantity" : ' + this . savedActivities [ ind ] . quantity ;
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

  clearDay (day: number) {
    this.dispActivities [ day-1 ] = {} ;
    this.completeMonth();
  }

  private getMonth() {
    for ( var i = 0 ; i < 31 ; i++ ) { this.dispActivities [ i ] = {} }

    this.activityService.getEmployeeMonthActivity(this.currentUser, this.year, this.month)
    .subscribe(
      act => {
        this.savedActivities = JSON.parse(JSON.stringify(act));
        this . savedActivities . forEach (
          e => { 
            var i = e . day -1 ;
            this.dispActivities [ i ] = e ;
            this.dispActivities [ i ] . dayoff = ( e . weekday == 0 || e . weekday == 6 ? 'day-off' : '' ) ;
            this.dispActivities [ i ] . dispweekday = this . dispdays [ e . weekday ] ;

            if ( this . phoArray [ this . year ] &&
                this . phoArray [ this . year ][ this . month ] &&
                this . phoArray [ this . year ][ this . month ][ +e . day ] ) {
              this . dispActivities [ i ] . dayoff = 'day-off' ;
            }
    
          }
        )

        this.completeMonth();
      }
    );
  }

  private completeMonth() {
    for (var i = 0; i < 31; i++) {
      if (JSON.stringify(this.dispActivities[i]) === '{}') {
        var madate = (+this.month) + '-' + (i + 1) + '-' + this.year;
        var weekday = this.datePipe.transform(madate, 'c');
        if (weekday == null)
          weekday = '0';
        this.dispActivities[i].year = this.year;
        this.dispActivities[i].month = this.month;
        this.dispActivities[i].day = "" + (i + 1);
        this.dispActivities[i].weekday = weekday;
        this.dispActivities[i].project = '';
        this.dispActivities[i].quantity = '';
        this.dispActivities[i].dayoff = (weekday == "0" || weekday == "6" ? 'day-off' : '');
        this.dispActivities[i].dispweekday = this.dispdays[+weekday];

        if (this.phoArray[this.year] &&
          this.phoArray[this.year][this.month] &&
          this.phoArray[this.year][this.month][i + 1]) {
          if (this.dispActivities[i].project === '')
            this.dispActivities[i].project = 'Jour Férié';
          this.dispActivities[i].dayoff = 'day-off';
        }
      }
    }
  }
}

@Component({
  selector: 'project-dialog',
  templateUrl: 'project-dialog.html',
  styleUrls: ['./act-month-current.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }]
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
