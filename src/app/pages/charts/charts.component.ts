import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { PatientModel } from 'src/app/models/patient.model';
import { CaregiversService } from 'src/app/services/caregivers.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  patient: PatientModel = new PatientModel();

  constructor(private caregiversService: CaregiversService) { }

  ngOnInit() {
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
    .subscribe((resp:any) => {
      this.caregiver = resp.caregiver[0];
      this.patient = this.caregiver.patient;
    })
  }


}