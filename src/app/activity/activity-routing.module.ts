import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActMainComponent} from './act-main/act-main.component' ;

const routes: Routes = [
  { path: 'activity', component: ActMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
