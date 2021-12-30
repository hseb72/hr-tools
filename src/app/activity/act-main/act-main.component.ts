import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  monthname: string;
  month: number;
  workdays: number;
  vacations: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {month: 1, monthname: 'Janvier', workdays: 22, status: '_turned_in', vacations: 0},
  {month: 2, monthname: 'Février', workdays: 18, status: '_turned_in', vacations: 0},
  {month: 3, monthname: 'Mars', workdays: 20, status: '_turned_in', vacations: 0},
  {month: 4, monthname: 'Avril', workdays: 21, status: '_turned_in', vacations: 0},
  {month: 5, monthname: 'Mai', workdays: 20, status: '_turned_in', vacations: 0},
  {month: 6, monthname: 'Juin', workdays: 19, status: '_turned_in', vacations: 0},
  {month: 7, monthname: 'Juillet', workdays: 6, status: '_turned_in', vacations: 0},
  {month: 8, monthname: 'Août', workdays: 16, status: '_turned_in', vacations: 0},
  {month: 9, monthname: 'Septembre', workdays: 21, status: '_turned_in', vacations: 0},
  {month: 10, monthname: 'Octobre', workdays: 22, status: '_turned_in', vacations: 0},
  {month: 11, monthname: 'Novembre', workdays: 22, status: '_late', vacations: 0},
  {month: 12, monthname: 'Décembre', workdays: 22, status: '', vacations: 0},
];
@Component({
  selector: 'app-act-main',
  templateUrl: './act-main.component.html',
  styleUrls: ['./act-main.component.scss']
})
export class ActMainComponent implements OnInit {
  
  displayedColumns: string[] = ['month', 'monthname', 'workdays', 'vacations', 'status'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
