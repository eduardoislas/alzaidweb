import { Component, OnInit } from '@angular/core';
import { PatientModel } from 'src/app/models/patient.model';
import { PatientActivityBinnacle } from 'src/app/models/binnacle.model';
import { BinnaclesService } from 'src/app/services/binnacles.service';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-binnaclesactivitypatient',
  templateUrl: './binnaclesactivitypatient.component.html',
  styleUrls: ['./binnaclesactivitypatient.component.css']
})
export class BinnaclesactivitypatientComponent implements OnInit {

  patient: PatientModel = new PatientModel();
  binnacles: PatientActivityBinnacle[] = [];
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
    this.binnaclesService.getPatientActivityBinnaclesByIdp(this.idp)
    .subscribe((resp:any) => {
      this.binnacles = resp.pabDB;
      console.log(this.binnacles);
    });

  }

}
