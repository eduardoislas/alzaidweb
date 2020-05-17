import { Component, OnInit } from '@angular/core';
import { CaregiverBinnacleModel } from '../../models/binnacle.model';
import { ActivatedRoute } from '@angular/router';
import { BinnaclesService } from 'src/app/services/binnacles.service';

@Component({
  selector: 'app-binnaclecaregiverdetail',
  templateUrl: './binnaclecaregiverdetail.component.html',
  styleUrls: ['./binnaclecaregiverdetail.component.css']
})
export class BinnaclecaregiverdetailComponent implements OnInit {

  idb: string;
  binnacle: CaregiverBinnacleModel = new CaregiverBinnacleModel();
  score: number;

  constructor(private binnaclesService: BinnaclesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.idb = this.route.snapshot.paramMap.get('id');

    this.binnaclesService.getCaregiverBinnacleByIdb(this.idb)
      .subscribe((resp:any) => {
        this.binnacle = resp.cbDB[0];
        this.calculaScore();
    });

    
  }


  calculaScore(){
    let suma = 0;
    for(let a of this.binnacle.answers){
      suma+=a;
    }
    this.score = suma;
  }

}
