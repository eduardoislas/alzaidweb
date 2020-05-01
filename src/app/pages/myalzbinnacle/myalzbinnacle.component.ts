import { Component, OnInit } from '@angular/core';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';

@Component({
  selector: 'app-myalzbinnacle',
  templateUrl: './myalzbinnacle.component.html',
  styleUrls: ['./myalzbinnacle.component.css']
})
export class MyalzbinnacleComponent implements OnInit {

  fechaHoy: Date = new Date();
  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  
  constructor(private caregiversService: CaregiversService) { }

  ngOnInit() {

        //Obtener Familiar
        this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
        .subscribe((resp:any) => {
          this.caregiver = resp.caregiver[0];
      });

  }

}
