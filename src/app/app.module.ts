import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
