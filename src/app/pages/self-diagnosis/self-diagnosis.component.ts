import { Component, OnInit } from '@angular/core';
import { CaregiverModel } from 'src/app/models/caregiver.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SelfEfficacyModel } from '../../models/scale.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-diagnosis',
  templateUrl: './self-diagnosis.component.html',
  styleUrls: ['./self-diagnosis.component.css']
})
export class SelfDiagnosisComponent implements OnInit {

  caregiver: CaregiverModel = new CaregiverModel();
  forma:FormGroup;
  items: string[] = [];
  respuestas: number[] = [];
  semodel: SelfEfficacyModel = new SelfEfficacyModel();

  constructor(private caregiversService: CaregiversService,
    private router: Router) {

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
      'respuesta15': new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
        //Obtener Familiar
        this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
        .subscribe((resp:any) => {
          this.convertirCaregiver(resp.caregiver[0]);
      });

      this.items.push('¿Hasta qué punto cree que usted es capaz de pedirle a un familiar o amigo que se quede un día con su familiar cuando necesita ir usted al médico?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de pedirle a un familiar o amigo que se quede con su familiar durante un día cuando usted tiene trámites que hacer?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de pedirle a un familiar o amigo que le haga los trámites?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de pedirle a un familiar o amigo que se quede un día con su familiar cuando usted necesita un descanso?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de pedirle a un familiar o amigo que se quede una semana con su familiar cuando usted necesita tiempo para sí mismo?');
      this.items.push('Cuando su familiar olvida su rutina diaria y pregunta cuándo es la hora de comer justo después de haber comido, ¿hasta qué punto cree que usted es capaz de responderle sin levantarle la voz? (aclarar que “responderle” puede ser directamente o con una distracción)');
      this.items.push('Cuando se enfada con su familiar porque repite la misma pregunta una y otra vez, ¿hasta qué punto cree que usted es capaz de decirse cosas para tranquilizarse a usted mismo?');
      this.items.push('Cuando su familiar se queja sobre cómo le está tratando, ¿hasta qué punto cree que usted es capaz de responder sin discutir (por ejemplo, tranquilizándole o distrayéndole)?');
      this.items.push('¿Cuando su familiar le pregunta 4 veces durante la primera hora después de comer que cuándo está lista la comida, hasta qué punto cree que usted es capaz de responderle sin levantar la voz?');
      this.items.push('¿Cuando su familiar le interrumpe por cuarta vez mientras está haciendo la cena, hasta qué punto cree que usted es capaz de responderle sin levantar la voz?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de controlar el pensar sobre los aspectos negativos o desagradables de cuidar de su familiar?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de controlar el pensar sobre lo injusto que es que usted tenga que aguantar esta situación (de cuidar de su familiar)?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de controlar el pensar en qué vida tan buena tuvo antes de la enfermedad de su familiar y cuánto ha perdido debido a ello?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de controlar el pensar sobre lo que se está perdiendo o a lo que está renunciando por cuidar de su familiar?');
      this.items.push('¿Hasta qué punto cree que usted es capaz de controlar el preocuparse sobre problemas futuros que pueden surgir debido al cuidado?');
      
  }


  convertirCaregiver(resp: any){
    this.caregiver._id = resp._id;
    this.caregiver.name = resp.name;
    this.caregiver.lastName = resp.lastName;
    this.caregiver.lastNameSecond = resp.lastNameSecond;
    this.caregiver.birthdate = resp.birthdate;
    this.caregiver.age = resp.age;
    this.caregiver.gender = resp.gender;
    this.caregiver.civilStatus = resp.civilStatus;
    this.caregiver.school = resp.school;
    this.caregiver.occupation = resp.occupation;
    this.caregiver.phone = resp.phone;
    this.caregiver.email = resp.email;
    this.caregiver.relation = resp.relation;
    this.caregiver.username = resp.user.name;
    this.caregiver.patient = resp.patient._id;
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
    
    this.caregiversService.enviarSelfEfficacy(this.semodel).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Autodiagnóstico registrado',
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
  
   this.semodel = {
     date: new Date(),
     answers: this.respuestas,
     scale: "Autoeficacia para el cuidado",
     caregiver: this.caregiver
   }
 }

}
