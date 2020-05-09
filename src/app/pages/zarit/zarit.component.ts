import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScaleModel, ValorationsModel } from 'src/app/models/scale.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { ScalesService } from 'src/app/services/scales.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zarit',
  templateUrl: './zarit.component.html',
  styleUrls: ['./zarit.component.css']
})
export class ZaritComponent implements OnInit {

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
        'respuesta20': new FormControl('', Validators.required),
        'respuesta21': new FormControl('', Validators.required),
        'respuesta22': new FormControl('', Validators.required)
      });
      
     }

  ngOnInit() {

    const idv = this.route.snapshot.paramMap.get('idv');
      this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
      .subscribe((resp:any) => {
        this.caregiver = resp.caregiver[0];
    });


      this.items.push('¿Siente que su familiar solicita más ayuda de la que realmente necesita?');
      this.items.push('¿Siente que debido al tiempo que dedica a su familiar ya no dispone de tiempo suficiente para usted?');
      this.items.push('¿Se siente tenso cuando tiene que cuidar a su familiar y atender además otras responsabilidades?');
      this.items.push('¿Se siente avergonzado por la conducta de su familiar?');
      this.items.push('¿Se siente enfadado cuando está cerca de su familiar?');
      this.items.push('¿Cree que la situación actual afecta de manera negativa a su relación con amigos y otros miembros de su familia?');
      this.items.push('¿Siente temor por el futuro que le espera a su familiar?');
      this.items.push('¿Siente que su familiar depende de usted?');
      this.items.push('¿Se siente agobiado cuando tiene que estar junto a su familiar?');
      this.items.push('¿Siente que su salud se ha resentido por cuidar a su familiar?');
      this.items.push('¿Siente que no tiene la vida privada que desearía debido a su familiar?');
      this.items.push('¿Cree que su vida social se ha visto afectada por tener que cuidar de su familiar?');
      this.items.push('¿Se siente incómodo para invitar amigos a casa, a causa de su familiar?');
      this.items.push('¿Cree que su familiar espera que usted le cuide, como si fuera la única persona con la que puede contar?');
      this.items.push('¿Cree que no dispone de dinero suficiente para cuidar a su familiar además de sus otros gastos?');
      this.items.push('¿Siente que será incapaz de cuidar a su familiar por mucho más tiempo?');
      this.items.push('¿Siente que ha perdido el control sobre su vida desde que la enfermedad de su familiar se manifestó?');
      this.items.push('¿Desearía poder encargar el cuidado de su familiar a otras personas?');
      this.items.push('¿Se siente inseguro acerca de lo que debe hacer con su familiar?');
      this.items.push('¿Siente que debería hacer más de lo que hace por su familiar?');
      this.items.push('¿Cree que podría cuidar de su familiar mejor de lo que lo hace?');
      this.items.push('En general: ¿Se siente muy sobrecargado por tener que cuidar de su familiar?');

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
    this.respuestas.push(form.controls.respuesta21.value);
    this.respuestas.push(form.controls.respuesta22.value);
   
    let score = 0;
    for(let r of this.respuestas){
      score += r;
    }
    this.scale = {
      date: new Date(),
      answers: this.respuestas,
      score: score,
      scaleType: 4,
      scale: "Sobrecarga",
      caregiver: this.caregiver,
      valoration: this.valoration
    }
  }

}
