import { Component, OnInit } from '@angular/core';
import { BinnaclesService } from 'src/app/services/binnacles.service';
import { ActivatedRoute } from '@angular/router';
import { PatientBinnacleModel } from '../../models/binnacle.model';

@Component({
  selector: 'app-binnaclepatientdetail',
  templateUrl: './binnaclepatientdetail.component.html',
  styleUrls: ['./binnaclepatientdetail.component.css']
})
export class BinnaclepatientdetailComponent implements OnInit {

  idb: string;
  binnacle: PatientBinnacleModel = new PatientBinnacleModel();
  behaviorsCatalog = ['Actitudes repetitivas', 'Agresividad', 'Ansiedad', 'Apatía', 'Cambio de Humor', 'Deambulación',
  'Delirios', 'Demandante de atención', 'Enfado/Molestia', 'Llanto', 'Sexual', 'Somnolencia'];

  constructor(private binnaclesService: BinnaclesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.idb = this.route.snapshot.paramMap.get('id');

    this.binnaclesService.getPatientBinnacleByIdb(this.idb)
      .subscribe((resp:any) => {
        this.binnacle = resp.pbDB[0];
    });

  }

}
