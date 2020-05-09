import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScaleModel, ValorationsModel } from 'src/app/models/scale.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScalesService } from 'src/app/services/scales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hada',
  templateUrl: './hada.component.html',
  styleUrls: ['./hada.component.css']
})
export class HadaComponent implements OnInit {

  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  forma:FormGroup;
  respuestas: number[] = [];
  items: string[] = [];
  scale: ScaleModel = new ScaleModel();
  valoration: ValorationsModel = new ValorationsModel();

  constructor(private caregiversService: CaregiversService, private scalesService: ScalesService,
    private router: Router, private route: ActivatedRoute) { 

      this.forma = new FormGroup({
        'respuesta1': new FormControl('', Validators.required),
        'respuesta2': new FormControl('', Validators.required),
        'respuesta3': new FormControl('', Validators.required),
        'respuesta4': new FormControl('', Validators.required),
        'respuesta5': new FormControl('', Validators.required),
        'respuesta6': new FormControl('', Validators.required),
        'respuesta7': new FormControl('', Validators.required)
      });

    }

  ngOnInit() {

    const idv = this.route.snapshot.paramMap.get('idv');
      this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
      .subscribe((resp:any) => {
        this.caregiver = resp.caregiver[0];
    });

    this.scalesService.getValorationById(idv)
      .subscribe((resp:any) => {
        this.valoration = resp.valoration;
    });

  }


  guardar(){
    if ( this.forma.invalid ){
      Swal.fire({
        icon: 'warning',
        title: 'Cuestionario incompleto',
        text: 'Asegúrese de haber contestado todas las preguntas'
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
    
    this.scalesService.saveScaleAnswers(this.scale).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Instrumento registrado',
        text: 'Registro guardado correctamente'
      });
      this.router.navigateByUrl('/autodiagnosis'); 
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el registro',
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
   
    let score = 0;
    for(let r of this.respuestas){
      score += r;
    }
    this.scale = {
      date: new Date(),
      answers: this.respuestas,
      score: score,
      scaleType: 2,
      scale: "Ansiedad",
      caregiver: this.caregiver,
      valoration: this.valoration
    }
  }


}
