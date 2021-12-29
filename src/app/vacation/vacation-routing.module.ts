import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VacMainComponent} from './vac-main/vac-main.component' ;

const routes: Routes = [
  { path: 'vacation', component: VacMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationRoutingModule { }
