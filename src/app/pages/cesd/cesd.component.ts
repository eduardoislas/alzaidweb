import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScaleModel, ValorationsModel } from 'src/app/models/scale.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScalesService } from 'src/app/services/scales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cesd',
  templateUrl: './cesd.component.html',
  styleUrls: ['./cesd.component.css']
})
export class CesdComponent implements OnInit {

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
        'respuesta7': new FormControl('', Validators.required),
        'respuesta8': new FormControl('', Validators.required),
        'respuesta9': new FormControl('', Validators.required),
        'respuesta10': new FormControl('', Validators.required),
        'respuesta11': new FormControl('', Validators.required),
        'respuesta12': new FormControl('', Validators.required),
        'respuesta13': new FormControl('', Validators.required),
        'respuesta14': new FormControl('', Validators.required),
        'respuesta15': new FormControl('', Validators.required),
        'respuesta16': new FormControl('', Validators.required),
        'respuesta17': new FormControl('', Validators.required),
        'respuesta18': new FormControl('', Validators.required),
        'respuesta19': new FormControl('', Validators.required),
        'respuesta20': new FormControl('', Validators.required)
      });
      
     }

  ngOnInit() {

    const idv = this.route.snapshot.paramMap.get('idv');
      this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
      .subscribe((resp:any) => {
        this.caregiver = resp.caregiver[0];
    });

      this.items.push('Me molestaron las cosas que normalmente no me molestan.');
      this.items.push('No me sentía con ganas de comer; no tenía apetito.');
      this.items.push('Sentía que no podía quitarme la tristeza a pesar de la ayuda de mi familia o amigos.');
      this.items.push('Sentía que yo era tan bueno como cualquier otra persona.');
      this.items.push('Tenia dificultad de concéntrame en lo que estaba haciendo.');
      this.items.push('Me sentía deprimido.');
      this.items.push('Sentía que todo lo que hacia me suponía esfuerzo.');
      this.items.push('Me sentía optimista sobre el futuro.');
      this.items.push('Pensé que mi vida había sido un fracaso.');
      this.items.push('Me sentía con miedo.');
      this.items.push('Mi sueño era inquieto.');
      this.items.push('Estaba contento.');
      this.items.push('Hable menos de lo habitual.');
      this.items.push('Me sentí solo.');
      this.items.push('La gente no era amigable.');
      this.items.push('Disfrute de la vida.');
      this.items.push('Pase ratos llorando.');
      this.items.push('Me sentí triste.');
      this.items.push('Sentía que no le caía bien a la gente.');
      this.items.push('No tenía ganas de hacer nada.');

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
    this.respuestas.push(form.controls.respuesta8.value);
    this.respuestas.push(form.controls.respuesta9.value);
    this.respuestas.push(form.controls.respuesta10.value);
    this.respuestas.push(form.controls.respuesta11.value);
    this.respuestas.push(form.controls.respuesta12.value);
    this.respuestas.push(form.controls.respuesta13.value);
    this.respuestas.push(form.controls.respuesta14.value);
    this.respuestas.push(form.controls.respuesta15.value);
    this.respuestas.push(form.controls.respuesta16.value);
    this.respuestas.push(form.controls.respuesta17.value);
    this.respuestas.push(form.controls.respuesta18.value);
    this.respuestas.push(form.controls.respuesta19.value);
    this.respuestas.push(form.controls.respuesta20.value);
   
    let score = 0;
    for(let r of this.respuestas){
      score += r;
    }
    this.scale = {
      date: new Date(),
      answers: this.respuestas,
      score: score,
      scaleType: 3,
      scale: "Depresión",
      caregiver: this.caregiver,
      valoration: this.valoration
    }
  }

}
