import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { CaregiversService } from '../../services/caregivers.service';

@Component({
  selector: 'app-mybinnacle',
  templateUrl: './mybinnacle.component.html',
  styleUrls: ['./mybinnacle.component.css']
})
export class MybinnacleComponent implements OnInit {

  fechaHoy = new Date();
  caregiver: CaregiverAPIModel = new CaregiverAPIModel();

  constructor(private caregiversService: CaregiversService) { }

  ngOnInit() {

    //Obtener Familiar
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
    .subscribe((resp:any) => {
      this.caregiver = resp.caregiver[0];
      console.log(this.caregiver);
  });


  }

}
