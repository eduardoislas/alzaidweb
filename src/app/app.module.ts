import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PatientComponent } from './pages/patient/patient.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { HeaderComponent } from './shared/header/header.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { DailyrecordsComponent } from './pages/dailyrecords/dailyrecords.component';
import { DailyrecordComponent } from './pages/dailyrecord/dailyrecord.component';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CaregiversComponent } from './pages/caregivers/caregivers.component';
import { CaregiverComponent } from './pages/caregiver/caregiver.component';
import { DailyrecordspatientComponent } from './pages/dailyrecordspatient/dailyrecordspatient.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PatientComponent,
    PatientsComponent,
    HeaderComponent,
    UsersComponent,
    UserComponent,
    DailyrecordsComponent,
    DailyrecordComponent,
    CatalogsComponent,
    CatalogComponent,
    FilterPipe,
    CaregiversComponent,
    CaregiverComponent,
    DailyrecordspatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
