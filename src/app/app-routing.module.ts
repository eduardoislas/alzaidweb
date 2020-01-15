import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientComponent } from './pages/patient/patient.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { DailyrecordsComponent } from './pages/dailyrecords/dailyrecords.component';
import { DailyrecordComponent } from './pages/dailyrecord/dailyrecord.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate:[ AuthGuard ] },
  { path: 'login'   , component: LoginComponent },
  { path: 'patients'   , component: PatientsComponent },
  { path: 'patient/:id'   , component: PatientComponent },
  { path: 'users'   , component: UsersComponent },
  { path: 'user/:id'   , component: UserComponent },
  { path: 'dailyrecords'   , component: DailyrecordsComponent },
  { path: 'dailyrecord/:id'   , component: DailyrecordComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
