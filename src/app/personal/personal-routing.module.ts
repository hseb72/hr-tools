import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards' ;

import { PerMainComponent} from './per-main/per-main.component' ;

const routes: Routes = [
  { path: 'personal', component: PerMainComponent, canActivate: [AuthGuard]  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
