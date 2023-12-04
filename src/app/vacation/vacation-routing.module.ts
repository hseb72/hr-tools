import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards' ;

import { VacMainComponent} from './vac-main/vac-main.component' ;
import { VacListComponent} from './vac-list/vac-list.component' ;

const routes: Routes = [
  { path: 'vacation', component: VacMainComponent, canActivate: [AuthGuard]  },
  { path: 'vacation/list', component: VacListComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationRoutingModule { }
