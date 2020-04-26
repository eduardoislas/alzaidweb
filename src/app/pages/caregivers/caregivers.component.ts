import { Component, OnInit } from '@angular/core';
import { CaregiverModel } from '../../models/caregiver.model';

@Component({
  selector: 'app-caregivers',
  templateUrl: './caregivers.component.html',
  styleUrls: ['./caregivers.component.css']
})
export class CaregiversComponent implements OnInit {


  caregivers: CaregiverModel[] = [];
  cargando = false;


  constructor() { }

  ngOnInit() {
  }

}
