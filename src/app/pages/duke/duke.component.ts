import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScaleModel, ValorationsModel } from 'src/app/models/scale.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScalesService } from 'src/app/services/scales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-duke',
  templateUrl: './duke.component.html',
  styleUrls: ['./duke.component.css']
})
export class DukeComponent implements OnInit {

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
        'respuesta11': new FormControl('', Validators.required)
      });
      
     }

  ngOnInit() {

    const idv = this.route.snapshot.paramMap.get('idv');
      this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
      .subscribe((resp:any) => {
        this.caregiver = resp.caregiver[0];
    });


      this.items.push('Recibo visitas de mis amigos y familiares.');
      this.items.push('Recibo ayuda en asuntos relacionados con mi casa.');
      this.items.push('Recibo elogios o reconocimientos cuando hago bien mi trabajo.');
      this.items.push('Cuento con personas que se preocupan de lo que me sucede.');
      this.items.push('Recibo amor y afecto.');
      this.items.push('Tengo la posibilidad de hablar con alguien de mis problemas en el trabajo o en la casa.');
      this.items.push('Tengo la posibilidad de hablar con alguien de mis problemas personales y familiares.');
      this.items.push('Tengo la posibilidad de hablar con alguien de mis problemas económicos.');
      this.items.push('Recibo invitaciones para distraerme y salir con otras personas.');
      this.items.push('Recibo consejos útiles cuando me ocurre algún acontecimiento importante en mi vida.');
      this.items.push('Recibo ayuda cuando estoy enfermo en la cama.');

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
   
    let score = 0;
    for(let r of this.respuestas){
      score += r;
    }
    this.scale = {
      date: new Date(),
      answers: this.respuestas,
      score: score,
      scaleType: 5,
      scale: "Apoyo social",
      caregiver: this.caregiver,
      valoration: this.valoration
    }
  }

}
