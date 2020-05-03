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
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CaregiverComponent } from './pages/caregiver/caregiver.component';
import { CaregiversComponent } from './pages/caregivers/caregivers.component';
import { DailyrecordspatientComponent } from './pages/dailyrecordspatient/dailyrecordspatient.component';
import { SelfDiagnosisComponent } from './pages/self-diagnosis/self-diagnosis.component';
import { AutodiagnosisComponent } from './pages/autodiagnosis/autodiagnosis.component';
import { ActivityprogramComponent } from './pages/activityprogram/activityprogram.component';
import { HomeactivitiesComponent } from './pages/homeactivities/homeactivities.component';
import { BinnaclecaregiverComponent } from './pages/binnaclecaregiver/binnaclecaregiver.component';
import { BinnaclepatientComponent } from './pages/binnaclepatient/binnaclepatient.component';


const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate:[ AuthGuard ] },
  { path: 'login'   , component: LoginComponent },
  { path: 'patients'   , component: PatientsComponent },
  { path: 'patient/:id'   , component: PatientComponent },
  { path: 'users'   , component: UsersComponent },
  { path: 'user/:id'   , component: UserComponent },
  { path: 'dailyrecords'   , component: DailyrecordsComponent },
  { path: 'dailyrecord/:id'   , component: DailyrecordComponent },
  { path: 'dailyrecordspatient'   , component: DailyrecordspatientComponent },
  { path: 'catalogs'   , component: CatalogsComponent },
  { path: 'catalog/:id'   , component: CatalogComponent },
  { path: 'caregivers' , component: CaregiversComponent },
  { path: 'caregiver/:id' , component: CaregiverComponent },
  { path: 'selfdiagnosis' , component: SelfDiagnosisComponent },
  { path: 'autodiagnosis' , component: AutodiagnosisComponent },
  { path: 'binnaclecaregiver' , component: BinnaclecaregiverComponent },
  { path: 'binnaclepatient' , component: BinnaclepatientComponent },
  { path: 'activityprogram' , component: ActivityprogramComponent },
  { path: 'homeactivities' , component: HomeactivitiesComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
