import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { HomeActivityModel, PatientActivityBinnacle, PatientBinnacleModel } from '../../models/binnacle.model';
import { BinnaclesService } from '../../services/binnacles.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientModel } from 'src/app/models/patient.model';
import { CatalogsService } from '../../services/catalogs.service';

@Component({
  selector: 'app-binnaclepatient',
  templateUrl: './binnaclepatient.component.html',
  styleUrls: ['./binnaclepatient.component.css']
})
export class BinnaclepatientComponent implements OnInit {
  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  fase: string;
  programadas: HomeActivityModel[] = [];
  actividadesBitacora: PatientActivityBinnacle[] = [];
  forma:FormGroup;
  patient: PatientModel = new PatientModel();
  behaviorsCatalog = ['Actitudes repetitivas', 'Agresividad', 'Ansiedad', 'Apatía', 'Cambio de Humor', 'Deambulación',
  'Delirios', 'Demandante de atención', 'Enfado/Molestia', 'Llanto', 'Sexual', 'Somnolencia'];
  behaviors = [false, false, false, false, false, false, false, false, false, false, false, false];
  // //Comportamientos
  // 0 = Actitudes repetitivas
  // 1 = Agresividad
  // 2 = Ansiedad
  // 3 = Apatía
  // 4 = Cambio de Humor
  // 5 = Deambulación
  // 6 = Delirios
  // 7 = Demandante de atención
  // 8 = Enfado/Molestia
  // 9 = Llanto
  // 10 = Sexual
  // 11 = Somnolencia
  patientBinnacle: PatientBinnacleModel = new PatientBinnacleModel();



  constructor(private caregiversService: CaregiversService,
                private binnaclesService: BinnaclesService, 
                private catalogsService: CatalogsService, private router: Router) {

                  this.forma = new FormGroup({
                    'date': new FormControl(),
                    'evacuation': new FormControl(),
                    'urination': new FormControl(),
                    'sleep': new FormControl(),
                    'constipation': new FormControl(),
                    'incontinence': new FormControl(),
                    'medicine': new FormControl(),
                    'incidence': new FormControl(),
                    'observation': new FormControl(),
                    'behavior1': new FormControl(),
                    'behavior2': new FormControl(),
                    'behavior3': new FormControl(),
                    'behavior4': new FormControl(),
                    'behavior5': new FormControl(),
                    'behavior6': new FormControl(),
                    'behavior7': new FormControl(),
                    'behavior8': new FormControl(),
                    'behavior9': new FormControl(),
                    'behavior10': new FormControl(),
                    'behavior11': new FormControl(),
                    'behavior12': new FormControl()
                  });

                 }

  ngOnInit() {

            //Obtener Familiar
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



  guardar(){

    Swal.fire(
      'Guardando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();
    this.cambiarFormaModel(this.forma);
    this.binnaclesService.saveBinnaclePatient(this.patientBinnacle).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Bitácora registrada',
        text: 'Registro guardado correctamente'
      });
      //this.router.navigateByUrl('/autodiagnosis'); 
      this.forma.reset();
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el registro',
        text: err
      });
    });
  }

  cambiarFormaModel(form:FormGroup){
    let respuestas = [];
    respuestas[0] = form.controls.behavior1.value;
    respuestas[1] = form.controls.behavior2.value;
    respuestas[2] = form.controls.behavior3.value;
    respuestas[3] = form.controls.behavior4.value;
    respuestas[4] = form.controls.behavior5.value;
    respuestas[5] = form.controls.behavior6.value;
    respuestas[6] = form.controls.behavior7.value;
    respuestas[7] = form.controls.behavior8.value;
    respuestas[8] = form.controls.behavior9.value;
    respuestas[9] = form.controls.behavior10.value;
    respuestas[10] = form.controls.behavior11.value;
    respuestas[11] = form.controls.behavior12.value;

    for (let i = 0; i < 12; i++){
      if (respuestas[i]==1){
        this.behaviors[i] = true;
      }else{
        this.behaviors[i] = false;
      }
    }

    this.patientBinnacle = {
      date: form.controls.date.value,
      evacuation: form.controls.evacuation.value,
      urination: form.controls.urination.value,
      sleep: form.controls.sleep.value,
      constipation: form.controls.constipation.value,
      incontinence: form.controls.incontinence.value,
      medicine: form.controls.medicine.value,
      incidence: form.controls.incidence.value,
      observation: form.controls.observation.value,
      behaviors: this.behaviors,
      patient: this.patient
    }
  }


}
