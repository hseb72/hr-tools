import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoMainComponent} from './bo-main/bo-main.component' ;

const routes: Routes = [
  { path: 'back-office', component: BoMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
