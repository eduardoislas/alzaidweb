import { Component, OnInit } from '@angular/core';
import { DailyRecordModel } from 'src/app/models/dailyrecord.model';
import { DailyrecordsService } from 'src/app/services/dailyrecords.service';
import { CaregiverModel } from '../../models/caregiver.model';
import { CaregiversService } from '../../services/caregivers.service';
import { PatientModel } from '../../models/patient.model';

@Component({
  selector: 'app-dailyrecordspatient',
  templateUrl: './dailyrecordspatient.component.html',
  styleUrls: ['./dailyrecordspatient.component.css']
})
export class DailyrecordspatientComponent implements OnInit {

  drs: DailyRecordModel[] = [];
  cargando = false;
  fecha = new Date();
  caregiver: CaregiverModel = new CaregiverModel();
  idPatient: string;
  p: number = 1;
  patient: PatientModel = new PatientModel();

  constructor(private dailyrecordsService: DailyrecordsService,
              private caregiversService: CaregiversService) { }

  ngOnInit() {
    this.cargando = true;

    //Obtener Familiar
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
    .subscribe((resp:any) => {
      this.convertirCaregiver(resp.caregiver[0]);
      this.idPatient = String(this.caregiver.patient);
      this.dailyrecordsService.getDailyRecordsPatient(this.idPatient)
      .subscribe((resp: any) => {
        this.drs = resp;
        this.cargando = false;
        this.patient = this.drs[0].patient;
    });
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
