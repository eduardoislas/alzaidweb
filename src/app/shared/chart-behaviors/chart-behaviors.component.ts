import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { PatientModel } from 'src/app/models/patient.model';
import { CaregiversService } from 'src/app/services/caregivers.service';

import { SingleDataSet, Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-chart-behaviors',
  templateUrl: './chart-behaviors.component.html',
  styleUrls: ['./chart-behaviors.component.css']
})
export class ChartBehaviorsComponent implements OnInit {

  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  patient: PatientModel = new PatientModel();
  data: number[] = [];
  labels: string[] = ['Actitudes repetitivas', 'Agresividad', 'Ansiedad', 'Apatía', 'Cambio de Humor', 'Deambulación',
  'Delirios', 'Demandante de atención', 'Enfado/Molestia', 'Llanto', 'Sexual', 'Somnolencia']

    //////////  Datos para comportamientos 
    ///// Polar chart
    public polarChartOptions: ChartOptions = {
      responsive: true,
      legend: {
        position: 'right'
      },
    };
    public polarAreaChartLabels: Label[] = this.labels;
    public behaviorDataset: SingleDataSet = this.data;
    public polarAreaLegend = true;
    public polarAreaChartType: ChartType = 'polarArea';
    public polarChartColors = [
      {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,100,255,0.3)', 'rgba(0,0,50,0.3)', 'rgba(0,150,150,0.5)',
        'rgba(10,208,198,0.3)', 'rgba(252,241,22,0.3)','rgba(241,22,252,0.3)','rgba(252,126,22,0.3)','rgba(22,149,252,0.8)', 'rgba(208,15,5,0.6)'],
      },
    ];
///////////////////////////////////////

  constructor(private caregiversService: CaregiversService,
    private chartsService: ChartsService) { }

  ngOnInit() {
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
    .subscribe((resp:any) => {
      this.caregiver = resp.caregiver[0];
      this.patient = this.caregiver.patient;
      this.chartsService.getBehaviorsById(this.patient._id)
      .subscribe((x:any) => {
        this.data.push(x.actRep);
        this.data.push(x.agresividad);
        this.data.push(x.ansiedad);
        this.data.push(x.apatia);
        this.data.push(x.cambioHumor);
        this.data.push(x.deambulacion);
        this.data.push(x.delirios);
        this.data.push(x.demAtencion);
        this.data.push(x.enfado);
        this.data.push(x.llanto);
        this.data.push(x.sexual);
        this.data.push(x.somnolencia);
        this.verificarValores();
      })
  })

}

verificarValores(){
  let indices=[];
  for (let i = 0; i < this.data.length; i++) {
    if (this.data[i] === 0){
      indices.push(i);
    }    
  }
  indices.forEach(e => {
    this.data.splice(e,1);
    this.labels.splice(e,1);
  });
  }
}
