import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Patient, PatientModel } from '../../models/patient.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { CaregiverModel } from 'src/app/models/caregiver.model';

@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.css']
})
export class CaregiverComponent implements OnInit {

  schools: string[] = ['Primaria', 'Secundaria', 'Bachillerato', 'Licenciatura', 'Posgrado'];
  relations: string[] = ['Esposo(a)', 'Pareja', 'Hijo(a)','Padre/Madre', 'Nieto(a)', 'Sobrino(a)', 'Amigo(a)', 'Otro'];
  civils: any[] = [{value: 'sinPareja', text: 'Sin Pareja'}, {value: 'conPareja', text: 'Con Pareja'}];
  genders: string[] = ['Femenino', 'Masculino'];
  religions: string[] = ['Religioso', 'No religioso'];
  occupations: string[] = ['Estudiante', 'Hogar', 'Empleado', 'Empresario', 'Pensionado', 'Desempleado'];
  patients: PatientModel[] = [];
  forma:FormGroup;
  caregiver: CaregiverModel = new CaregiverModel();

  constructor(private patientsService: PatientsService, 
    private router: Router,
    private route: ActivatedRoute,
    private caregiversService: CaregiversService) { 

      this.forma = new FormGroup({
        '_id': new FormControl({value:'', disabled:true}),
        'name': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'lastNameSecond': new FormControl(),
        'birthdate': new FormControl(),
        'age': new FormControl(),
        'gender': new FormControl(),
        'civilStatus': new FormControl(),
        'religion': new FormControl(),
        'school': new FormControl(),
        'occupation': new FormControl(),
        'phone': new FormControl(),
        'email': new FormControl(),
        'patient': new FormControl('', Validators.required),
        'relation': new FormControl('', Validators.required),
        'username': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
      })
      
    }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.patientsService.getPatients()
      .subscribe((resp: any) =>{
        this.patients = resp;
      });

    // if ( id !== 'nuevo' ){
    //     this.caregiversService.getCaregiver(id)
    //     .subscribe((resp: any) => {
    //       this.forma.setValue(resp.caregiver);
    //       //this.forma.controls['_id'].controls = id;
    //       console.log(this.forma);
    //     });

  }

  guardar(){
    if ( this.forma.invalid ){
      return;
    }

    Swal.fire(
    'Guardando',
    'Espere por favor...',
    'info', 
    );
    Swal.showLoading();

    let peticion: Observable<any>;
    peticion = this.caregiversService.crearCaregiver( this.cambiarFormaModel(this.forma));

    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.caregiver.name + ' '+ this.caregiver.lastName,
        text: 'Se actualizó correctamente'
      });
      this.router.navigateByUrl('/caregivers'); 
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el cuidador',
        text: err
      });
    });
  }


  cambiarFormaModel(form:FormGroup) {

    this.caregiver.name = form.controls.name.value;
    this.caregiver.lastName = form.controls.lastName.value;
    this.caregiver.lastNameSecond = form.controls.lastNameSecond.value;
    this.caregiver.birthdate = form.controls.birthdate.value;
    this.caregiver.age = form.controls.age.value;
    this.caregiver.gender = form.controls.gender.value;
    this.caregiver.civilStatus = form.controls.civilStatus.value;
    this.caregiver.religion = form.controls.religion.value;
    this.caregiver.school = form.controls.school.value;
    this.caregiver.occupation = form.controls.occupation.value;
    this.caregiver.phone = form.controls.phone.value;
    this.caregiver.email = form.controls.email.value;
    this.caregiver.patient = form.controls.patient.value;
    this.caregiver.relation = form.controls.relation.value;
    this.caregiver.username = form.controls.username.value;
    this.caregiver.password = form.controls.password.value;

    return this.caregiver;
  }


}
