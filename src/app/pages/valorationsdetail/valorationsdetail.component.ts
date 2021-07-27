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
  caregivers: any[] = [];
  scalesfull: any[] = [];
  caregiversList: any[]=[{id:'',name:'',lastName:'',lastNameSecond:''}];
  idCaregiver: string;
  idv: string;
  val: any;

  constructor(private scalesService: ScalesService, private route: ActivatedRoute,
              private caregiversService: CaregiversService) {}

  ngOnInit() {
    this.caregiversService.getCaregivers()
      .subscribe((resp:any) => {
        this.caregivers = resp;
        // this.caregivers.unshift(new CaregiverModel());
    });

    this.idv = this.route.snapshot.paramMap.get('id');
    this.scalesService.getValorationById(this.idv)
    .subscribe((resp:any)=>{
      this.val = resp.valoration;
    })

    this.scalesService.getCaregiversValoration(this.idv)
    .subscribe((resp:any) => {
      this.scalesfull = resp.scales;
      console.log(this.scalesfull);
      for (let i = 0; i < this.scalesfull.length; i++) {
        let s = this.scalesfull[i];
        this.caregivers.forEach(element => {
          if(s === element._id){
          let caregiver = {
            id: s,
            name: element.name,
            lastName: element.lastName,
            lastNameSecond: element.lastNameSecond
          }
          this.caregiversList.push(caregiver);
        }
        });
      }
    })    
    

  }



  onChange(value: string){
    this.idCaregiver = value;
    this.scalesService.getScaleValCare(this.idCaregiver, this.idv)
    .subscribe((resp: any) => {
      this.scales = resp.scales;
    });
}

}
