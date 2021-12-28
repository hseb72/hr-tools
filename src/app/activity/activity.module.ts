import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActMainComponent } from './act-main/act-main.component';
import { ActHeaderComponent } from './act-header/act-header.component';
import { ActFooterComponent } from './act-footer/act-footer.component';


@NgModule({
  declarations: [
    ActMainComponent,
    ActHeaderComponent,
    ActFooterComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
