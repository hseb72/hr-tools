import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guards' ;

import { RefMainComponent } from './ref-main/ref-main.component';
import { HolidayComponent} from './holiday/holiday.component' ;

const routes: Routes = [
  { path: 'back-office/invoice', component: RefMainComponent, canActivate: [AuthGuard] },
  { path: 'back-office/reference/holiday', component: HolidayComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceRoutingModule { }
