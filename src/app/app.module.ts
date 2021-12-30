import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
];

import { HomeComponent } from './home/home.component';
import { ActivityModule } from './activity/activity.module';
import { VacationModule } from './vacation/vacation.module';
import { BackOfficeModule } from './back-office/back-office.module';
import { PersonalModule } from './personal/personal.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    uiModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ActivityModule,
    VacationModule,
    BackOfficeModule,
    PersonalModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
//  exports: [ uiModules ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ uiModules ]
})
export class AppModule { }
