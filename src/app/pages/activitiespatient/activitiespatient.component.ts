import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeActivityModel, PatientActivityBinnacle } from 'src/app/models/binnacle.model';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { PatientModel } from 'src/app/models/patient.model';
import { BinnaclesService } from 'src/app/services/binnacles.service';
import { CaregiversService } from 'src/app/services/caregivers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activitiespatient',
  templateUrl: './activitiespatient.component.html',
  styleUrls: ['./activitiespatient.component.css']
})
export class ActivitiespatientComponent implements OnInit {

  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  patient: PatientModel = new PatientModel();
  programadas: HomeActivityModel[] = [];
  actividadesBitacora: PatientActivityBinnacle[] = [];

  constructor(private caregiversService: CaregiversService,
    private binnaclesService: BinnaclesService,
    private router: Router) { }

  ngOnInit() {
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
    .subscribe((resp:any) => {
      this.caregiver = resp.caregiver[0];
      this.patient = this.caregiver.patient;
  });
    this.binnaclesService.getHomeActivitiesPhase(localStorage.getItem('fase'))
              .subscribe((resp: any) => {
              this.programadas = resp.has;
            });
  }

  evaluarBitacora( homeActivity: HomeActivityModel, i: number){
    let done: boolean;
    this.binnaclesService.getPatientActivitiesDone(this.caregiver.patient._id, homeActivity._id)
    // this.binnaclesService.getPatientActivitiesDone('5e46ee3660c91869838ed4c8', '5eaf81c590d5e8001736106f')
              .subscribe((resp: any) => {
              done = resp.success;
              if(done){
                Swal.fire({
                  icon: 'info',
                  title: 'Actividad ya evaluada',
                  text: 'Esta actividad ya está evaluada y registrada'
                });
              }else{
                this.router.navigate(['/binnaclepatientevaluation', {idp: this.caregiver.patient._id, ida: homeActivity._id}]);
              }
            });
  }
}
