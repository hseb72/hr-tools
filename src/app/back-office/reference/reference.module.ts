import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenceRoutingModule } from './reference-routing.module';
import { RefHeaderComponent } from './ref-header/ref-header.component';
import { RefMainComponent } from './ref-main/ref-main.component';
import { HolidayComponent } from './holiday/holiday.component';
import { FreelancerComponent } from './freelancer/freelancer.component';

import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [
    RefHeaderComponent,
    RefMainComponent,
    HolidayComponent,
    FreelancerComponent
  ],
  imports: [
    CommonModule,
    ReferenceRoutingModule,
    uiModules
  ]
})
export class ReferenceModule { }