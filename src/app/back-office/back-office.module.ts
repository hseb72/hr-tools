import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BoHeaderComponent } from './bo-header/bo-header.component';
import { BoFooterComponent } from './bo-footer/bo-footer.component';
import { BoMainComponent } from './bo-main/bo-main.component';


@NgModule({
  declarations: [
    BoHeaderComponent,
    BoFooterComponent,
    BoMainComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule { }
