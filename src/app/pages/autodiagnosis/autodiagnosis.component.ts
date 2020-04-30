import { Component, OnInit } from '@angular/core';
import { SelfEfficacyModel } from '../../models/scale.model';
import { CaregiverModel } from 'src/app/models/caregiver.model';
import { CaregiversService } from 'src/app/services/caregivers.service';

@Component({
  selector: 'app-autodiagnosis',
  templateUrl: './autodiagnosis.component.html',
  styleUrls: ['./autodiagnosis.component.css']
})
export class AutodiagnosisComponent implements OnInit {

  cargando = false;
  semodels: SelfEfficacyModel[] = [];
  caregiver: CaregiverModel = new CaregiverModel();

  constructor(private caregiversService: CaregiversService) { }

  ngOnInit() {
    //Obtener Familiar
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
    .subscribe((resp:any) => {
      this.convertirCaregiver(resp.caregiver[0]);
      this.caregiversService.obtenerSelfEfficacyByID(resp.caregiver[0]._id)
    .subscribe((resp:any) => {
      this.semodels = resp;
    })
  });

    
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

}
