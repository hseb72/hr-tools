import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VacationRoutingModule } from './vacation-routing.module';
import { VacMainComponent } from './vac-main/vac-main.component';
import { VacHeaderComponent } from './vac-header/vac-header.component';

import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    VacMainComponent,
    VacHeaderComponent
  ],
  imports: [
    uiModules,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    VacationRoutingModule
  ]
})
export class VacationModule { }
