import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component" ;
import { PerMainComponent } from "./personal/per-main/per-main.component" ;

const routes: Routes = [
  { path: '', component: PerMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
