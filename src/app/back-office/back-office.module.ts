import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BoHeaderComponent } from './bo-header/bo-header.component';
import { BoMainComponent } from './bo-main/bo-main.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
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
    BoMainComponent,
    BoHeaderComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    uiModules
  ]
})
export class BackOfficeModule { }
