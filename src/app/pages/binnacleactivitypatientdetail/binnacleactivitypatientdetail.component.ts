import { Component, OnInit } from '@angular/core';
import { PatientActivityBinnacle } from 'src/app/models/binnacle.model';
import { BinnaclesService } from 'src/app/services/binnacles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-binnacleactivitypatientdetail',
  templateUrl: './binnacleactivitypatientdetail.component.html',
  styleUrls: ['./binnacleactivitypatientdetail.component.css']
})
export class BinnacleactivitypatientdetailComponent implements OnInit {

  idb: string;
  binnacle: PatientActivityBinnacle = new PatientActivityBinnacle();
  

  constructor(private binnaclesService: BinnaclesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.idb = this.route.snapshot.paramMap.get('id');

    this.binnaclesService.getPatientActivityBinnacleByIdb(this.idb)
      .subscribe((resp:any) => {
        this.binnacle = resp.pabDB[0];
        console.log(this.binnacle);
    });

  }

}