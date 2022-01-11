import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActMainComponent } from './act-main/act-main.component';
import { ActHeaderComponent } from './act-header/act-header.component';

import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActMonthComponent } from './act-month/act-month.component';
import { ActTimeComponent } from './act-time/act-time.component';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
];
@NgModule({
  declarations: [
    ActMainComponent,
    ActHeaderComponent,
    ActMonthComponent,
    ActTimeComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    uiModules
  ]
})
export class ActivityModule { }
