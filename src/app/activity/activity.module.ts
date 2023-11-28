import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActMainComponent } from './act-main/act-main.component';
import { ActHeaderComponent } from './act-header/act-header.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { ActMonthComponent } from './act-month/act-month.component';
import { ActTimeComponent } from './act-time/act-time.component';
import { ActAlertComponent } from './act-alert/act-alert.component';
import { ActYearSummaryComponent } from './act-year-summary/act-year-summary.component';
import { ActMonthSummaryComponent } from './act-month-summary/act-month-summary.component';
import { ActMonthPubholidaysComponent } from './act-month-pubholidays/act-month-pubholidays.component';
import { ActMonthUploadComponent } from './act-month-upload/act-month-upload.component';
import { ActMonthCalnavComponent } from './act-month-calnav/act-month-calnav.component';
import { ActMonthCurrentComponent, DialogOverviewExampleDialog } from './act-month-current/act-month-current.component';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatDialogModule,
  MatRadioModule,
  MatInputModule
];
@NgModule({
  declarations: [
    ActMainComponent,
    ActHeaderComponent,
    ActMonthComponent,
    ActTimeComponent,
    ActAlertComponent,
    ActYearSummaryComponent,
    ActMonthSummaryComponent,
    ActMonthPubholidaysComponent,
    ActMonthUploadComponent,
    ActMonthCalnavComponent,
    ActMonthCurrentComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ActivityRoutingModule,
    uiModules
  ]
})
export class ActivityModule { }
