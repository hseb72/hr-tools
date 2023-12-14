import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvHeaderComponent } from './inv-header/inv-header.component';
import { InvMainComponent } from './inv-main/inv-main.component';
import { InvAwaitedComponent } from './inv-awaited/inv-awaited.component';
import { InvPaylateComponent } from './inv-paylate/inv-paylate.component';
import { InvUploadComponent } from './inv-upload/inv-upload.component';
import { InvReportComponent } from './inv-report/inv-report.component';

import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    InvHeaderComponent,
    InvMainComponent,
    InvAwaitedComponent,
    InvPaylateComponent,
    InvUploadComponent,
    InvReportComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    uiModules
  ]
})
export class InvoiceModule { }
