import { Component, OnInit } from '@angular/core';
import { ScalesService } from 'src/app/services/scales.service';
import { ScaleModel } from '../../models/scale.model';
import { CaregiverModel } from 'src/app/models/caregiver.model';
import { ActivatedRoute } from '@angular/router';
import { CaregiversService } from '../../services/caregivers.service';

@Component({
  selector: 'app-valorationsdetail',
  templateUrl: './valorationsdetail.component.html',
  styleUrls: ['./valorationsdetail.component.css']
})
export class ValorationsdetailComponent implements OnInit {

  scales: ScaleModel[] = [];
  caregivers: CaregiverModel[] = [];
  idCaregiver: string;
  idv: string;

  constructor(private scalesService: ScalesService, private route: ActivatedRoute,
              private caregiversService: CaregiversService) {}

  ngOnInit() {

    this.caregiversService.getCaregivers()
      .subscribe((resp:any) => {
        this.caregivers = resp;
        this.caregivers.unshift(new CaregiverModel())
    });

    this.idv = this.route.snapshot.paramMap.get('id');
    
  }



  onChange(value: string){
    this.idCaregiver = value;
    this.scalesService.getScaleValCare(this.idCaregiver, this.idv)
    .subscribe((resp: any) => {
      this.scales = resp.scales;
    });
}

}
