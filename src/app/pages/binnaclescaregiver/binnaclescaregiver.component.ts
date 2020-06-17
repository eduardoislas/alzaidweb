import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { CaregiverBinnacleModel } from '../../models/binnacle.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { BinnaclesService } from 'src/app/services/binnacles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-binnaclescaregiver',
  templateUrl: './binnaclescaregiver.component.html',
  styleUrls: ['./binnaclescaregiver.component.css']
})
export class BinnaclescaregiverComponent implements OnInit {

  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  binnacles: CaregiverBinnacleModel[] = [];
  idc: string;
  p: number = 1;

  constructor(private binnaclesService: BinnaclesService, private route: ActivatedRoute,
    private caregiversService: CaregiversService) { }

  ngOnInit() {

    this.idc = this.route.snapshot.paramMap.get('id');

    this.caregiversService.getCaregiver(this.idc)
      .subscribe((resp:any) => {
        this.caregiver = resp.caregiver;
    });
    this.binnaclesService.getBinnacleCaregiverByID(this.idc)
    .subscribe((resp:any) => {
      this.binnacles = resp;
    });

  }

}
