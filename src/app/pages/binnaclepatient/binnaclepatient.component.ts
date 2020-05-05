import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { HomeActivityModel, PatientActivityBinnacle } from '../../models/binnacle.model';
import { BinnaclesService } from '../../services/binnacles.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-binnaclepatient',
  templateUrl: './binnaclepatient.component.html',
  styleUrls: ['./binnaclepatient.component.css']
})
export class BinnaclepatientComponent implements OnInit {
  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  fase: string;
  programadas: HomeActivityModel[] = [];
  actividadesBitacora: PatientActivityBinnacle[] = []


  constructor(private caregiversService: CaregiversService,
                private binnaclesService: BinnaclesService, private router: Router) { }

  ngOnInit() {

            //Obtener Familiar
          this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
            .subscribe((resp:any) => {
              this.caregiver = resp.caregiver[0];
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