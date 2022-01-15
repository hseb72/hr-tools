import { Component, OnInit } from '@angular/core';

export interface MonthActivity {
  monthname: string;
  month: number;
  workdays: number;
  vacations: number;
  status: string;
}

@Component({
  selector: 'app-act-main',
  templateUrl: './act-main.component.html',
  styleUrls: ['./act-main.component.scss']
})
export class ActMainComponent implements OnInit {
  

  constructor(
  ) {
   }

  ngOnInit(): void {
  }

}
