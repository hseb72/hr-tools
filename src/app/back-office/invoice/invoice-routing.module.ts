import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guards' ;


import { InvMainComponent } from './inv-main/inv-main.component';
import { InvAwaitedComponent } from './inv-awaited/inv-awaited.component';
import { InvPaylateComponent } from './inv-paylate/inv-paylate.component';
import { InvUploadComponent } from './inv-upload/inv-upload.component';
import { InvReportComponent } from './inv-report/inv-report.component';

const routes: Routes = [
  { path: 'back-office/invoice', component: InvMainComponent, canActivate: [AuthGuard] },
  { path: 'back-office/invoice/inv-awaited', component: InvAwaitedComponent, canActivate: [AuthGuard] },
  { path: 'back-office/invoice/inv-paylate', component: InvPaylateComponent, canActivate: [AuthGuard] },
  { path: 'back-office/invoice/inv-upload', component: InvUploadComponent, canActivate: [AuthGuard] },
  { path: 'back-office/invoice/inv-report', component: InvReportComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
