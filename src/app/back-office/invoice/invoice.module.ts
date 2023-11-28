import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvHeaderComponent } from './inv-header/inv-header.component';
import { InvMainComponent } from './inv-main/inv-main.component';
import { InvAwaitedComponent } from './inv-awaited/inv-awaited.component';
import { InvPaylateComponent } from './inv-paylate/inv-paylate.component';
import { InvUploadComponent } from './inv-upload/inv-upload.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

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
    InvUploadComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    uiModules
  ]
})
export class InvoiceModule { }
