import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRoutingModule } from './vacation-routing.module';
import { VacMainComponent } from './vac-main/vac-main.component';
import { VacHeaderComponent } from './vac-header/vac-header.component';
import { VacFooterComponent } from './vac-footer/vac-footer.component';


@NgModule({
  declarations: [
    VacMainComponent,
    VacHeaderComponent,
    VacFooterComponent
  ],
  imports: [
    CommonModule,
    VacationRoutingModule
  ]
})
export class VacationModule { }
