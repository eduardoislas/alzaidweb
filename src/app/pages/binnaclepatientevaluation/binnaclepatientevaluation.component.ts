import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BinnaclesService } from 'src/app/services/binnacles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeActivityModel, PatientActivityBinnacle } from '../../models/binnacle.model';
import Swal from 'sweetalert2';
import { PatientModel } from 'src/app/models/patient.model';
import { PatientsService } from '../../services/patients.service';

@Component({
  selector: 'app-binnaclepatientevaluation',
  templateUrl: './binnaclepatientevaluation.component.html',
  styleUrls: ['./binnaclepatientevaluation.component.css']
})
export class BinnaclepatientevaluationComponent implements OnInit {

  forma:FormGroup;
  idp: string;
  ida: string;
  activity: HomeActivityModel;
  respuestas: number[] = [];
  bitacora: PatientActivityBinnacle = new PatientActivityBinnacle();
  patient: PatientModel = new PatientModel();

  constructor(private binnaclesService: BinnaclesService, 
    private route: ActivatedRoute, private patientsService: PatientsService,
    private router: Router) { 

    this.forma = new FormGroup({
      'respuesta1': new FormControl('', Validators.required),
      'respuesta2': new FormControl('', Validators.required),
      'respuesta3': new FormControl('', Validators.required),
      'respuesta4': new FormControl('', Validators.required),
      'respuesta5': new FormControl(),
      'respuesta6': new FormControl(),
    });

  }

  ngOnInit() {
    this.idp = this.route.snapshot.paramMap.get('idp');
    this.ida = this.route.snapshot.paramMap.get('ida');

    //Obtener Actividad
    this.binnaclesService.getHomeActivityById(this.ida)
    .subscribe((resp:any) => {
        this.activity = resp.ha;
    });

    this.patientsService.getPatient(this.idp)
    .subscribe((resp:any) => {
        this.patient = resp.patient;
    });
  }

  guardar(){
    console.log(this.forma);
    if ( this.forma.invalid ){
      Swal.fire({
        icon: 'warning',
        title: 'Cuestionario incompleto',
        text: 'Asegúrese de haber contestado al menos de la 1 a la 4'
      });
      return;
    }

    Swal.fire(
      'Guardando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();
    this.cambiarFormaModel(this.forma);
    this.binnaclesService.savePatientBinnacle(this.bitacora).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Actividad de Bitácora registrada',
        text: 'Registro guardado correctamente'
      });
      this.router.navigateByUrl('/binnaclepatient'); 
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar la bitácora',
        text: err
      });
    });
  }

  cambiarFormaModel(form:FormGroup){
    this.respuestas.push(form.controls.respuesta1.value);
    this.respuestas.push(form.controls.respuesta2.value);
    this.respuestas.push(form.controls.respuesta3.value);
    this.respuestas.push(form.controls.respuesta4.value);
       
    this.bitacora = {
      date: new Date(),
      answers: this.respuestas,
      patient: this.patient,
      activity: this.activity,
      difficulty: form.controls.respuesta5.value,
      observation: form.controls.respuesta6.value
    }
  }

}
