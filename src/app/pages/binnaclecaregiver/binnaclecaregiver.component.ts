import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CaregiverBinnacleModel } from '../../models/binnacle.model';
import { BinnaclesService } from '../../services/binnacles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-binnaclecaregiver',
  templateUrl: './binnaclecaregiver.component.html',
  styleUrls: ['./binnaclecaregiver.component.css']
})
export class BinnaclecaregiverComponent implements OnInit {

  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  forma:FormGroup;
  respuestas: number[] = [];
  cbmodel: CaregiverBinnacleModel = new CaregiverBinnacleModel();

  constructor(private caregiversService: CaregiversService,
              private binnaclesService: BinnaclesService) {

      this.forma = new FormGroup({
      'respuesta1': new FormControl('', Validators.required),
      'respuesta2': new FormControl('', Validators.required),
      'respuesta3': new FormControl('', Validators.required),
      'respuesta4': new FormControl('', Validators.required),
      'respuesta5': new FormControl('', Validators.required),
      'respuesta6': new FormControl('', Validators.required),
      'respuesta7': new FormControl('', Validators.required),
      'respuesta8': new FormControl('', Validators.required),
      'respuesta9': new FormControl('', Validators.required),
      'respuesta10': new FormControl('', Validators.required),
      'respuesta11': new FormControl('', Validators.required)
      });
   }

  ngOnInit() {

        //Obtener Familiar
        this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
        .subscribe((resp:any) => {
          this.caregiver = resp.caregiver[0];
          localStorage.setItem('fase', this.caregiver.patient.phase);
      });

      
  }


  guardar(){
    if ( this.forma.invalid ){
      Swal.fire({
        icon: 'warning',
        title: 'Cuestionario incompleto',
        text: 'Asegúrese de haber contestado todas las afirmaciones'
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
    console.log(this.cbmodel);
    this.binnaclesService.saveCaregiverBinnacle(this.cbmodel).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Bitácora registrada',
        text: 'Registro guardado correctamente'
      });
      this.forma.reset();
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
    this.respuestas.push(form.controls.respuesta5.value);
    this.respuestas.push(form.controls.respuesta6.value);
    this.respuestas.push(form.controls.respuesta7.value);
    this.respuestas.push(form.controls.respuesta8.value);
    this.respuestas.push(form.controls.respuesta9.value);
    this.respuestas.push(form.controls.respuesta10.value);
    this.respuestas.push(form.controls.respuesta11.value);
   
    this.cbmodel = {
      date: new Date(),
      answers: this.respuestas,
      caregiver: this.caregiver
    }
  }

}
