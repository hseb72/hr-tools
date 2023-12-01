import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards' ;

import { ActMainComponent} from './act-main/act-main.component' ;
import { ActMonthComponent} from './act-month/act-month.component' ;
import { ActTimeComponent} from './act-time/act-time.component' ;
import { ActCalComponent} from './act-cal/act-cal.component' ;

const routes: Routes = [
  { path: 'activity', component: ActMainComponent, canActivate: [AuthGuard] },
  { path: 'activity/time', component: ActTimeComponent, canActivate: [AuthGuard] },
  { path: 'activity/month/:year/:month', component: ActMonthComponent, canActivate: [AuthGuard] },
  { path: 'activity/calendar', component: ActCalComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
