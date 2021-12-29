import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActMainComponent } from './act-main/act-main.component';
import { ActHeaderComponent } from './act-header/act-header.component';
import { ActFooterComponent } from './act-footer/act-footer.component';

import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule
];
@NgModule({
  declarations: [
    ActMainComponent,
    ActHeaderComponent,
    ActFooterComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    uiModules
  ]
})
export class ActivityModule { }
