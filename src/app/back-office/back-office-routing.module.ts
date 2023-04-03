import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards' ;

import { BoMainComponent} from './bo-main/bo-main.component' ;
import { InvMainComponent} from './invoice/inv-main/inv-main.component' ;

const routes: Routes = [
  { path: 'back-office', component: BoMainComponent, canActivate: [AuthGuard] },
  { path: 'back-office/invoice', component: InvMainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
