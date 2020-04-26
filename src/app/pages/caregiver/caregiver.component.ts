import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.css']
})
export class CaregiverComponent implements OnInit {

  schools: string[] = ['Primaria', 'Secundaria', 'Bachillerato', 'Licenciatura', 'Posgrado'];
  relations: string[] = ['Esposo(a)', 'Pareja', 'Hijo(a)','Padre/Madre', 'Nieto(a)', 'Sobrino(a)', 'Amigo(a)', 'Otro'];
  civils: any[] = [{value: 'soltero', text: 'Soltero/Divorciado/Viudo'}, {value: 'casado', text: 'Casado/Unido'}];
  genders: string[] = ['Femenino', 'Masculino'];
  patients: Patient[] = [];
  forma:FormGroup;

  constructor(private patientsService: PatientsService, 
    private router: Router,
    private route: ActivatedRoute) { 

      this.forma = new FormGroup({
        '_id': new FormControl({value:'', disabled:true}),
        'name': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'lastNameSecond': new FormControl(),
        'birthdate': new FormControl(),
        'age': new FormControl(),
        'gender': new FormControl(),
        'civilStatus': new FormControl(),
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

    this.patientsService.getPatients()
      .subscribe((resp: any) =>{
        this.patients = resp;
      });

  }

}
