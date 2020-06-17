import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { PatientBinnacleModel } from '../../models/binnacle.model';
import { BinnaclesService } from '../../services/binnacles.service';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../services/patients.service';

@Component({
  selector: 'app-binnaclespatient',
  templateUrl: './binnaclespatient.component.html',
  styleUrls: ['./binnaclespatient.component.css']
})
export class BinnaclespatientComponent implements OnInit {

  patient: PatientModel = new PatientModel();
  binnacles: PatientBinnacleModel[] = [];
  idp: string;
  p: number = 1;

  constructor(private binnaclesService: BinnaclesService, private route: ActivatedRoute,
              private patientsService: PatientsService) { }

  ngOnInit() {

    this.idp = this.route.snapshot.paramMap.get('id');

    this.patientsService.getPatient(this.idp)
      .subscribe((resp:any) => {
        this.patient = resp.patient;
    });
    this.binnaclesService.getPatientBinnaclesByIdp(this.idp)
    .subscribe((resp:any) => {
      this.binnacles = resp.pbDB;
    });
  }

}
