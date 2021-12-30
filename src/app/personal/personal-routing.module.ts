import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerMainComponent} from './per-main/per-main.component' ;

const routes: Routes = [
  { path: 'personal', component: PerMainComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
