import { Component, OnInit } from '@angular/core';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { PatientModel } from 'src/app/models/patient.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { ChartsService } from 'src/app/services/charts.service';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-chart-hygiene',
  templateUrl: './chart-hygiene.component.html',
  styleUrls: ['./chart-hygiene.component.css']
})
export class ChartHygieneComponent implements OnInit {

  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  patient: PatientModel = new PatientModel();
  data: number[] = [];
  labels: string[] = ['Micción', 'Baño', 'Cambio de protectores', 'Evacuación', 'Cambio de ropa', 'Estreñimiento'];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left'
    },
  };
  public pieChartLabels: Label[] = this.labels;
  public pieChartData: number[] = this.data;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,100,255,0.3)', 'rgba(0,0,50,0.3)', 'rgba(0,150,150,0.5)'],
    },
  ];


  constructor(private caregiversService: CaregiversService,
    private chartsService: ChartsService) { }

  ngOnInit() {
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
    .subscribe((resp:any) => {
      this.caregiver = resp.caregiver[0];
      this.patient = this.caregiver.patient;
      this.chartsService.getHygieneById(this.patient._id)
      .subscribe((x:any) => {
        this.data.push(x.miccion);
        this.data.push(x.bano);
        this.data.push(x.protectores);
        this.data.push(x.evacuacion);
        this.data.push(x.ropa);
        this.data.push(x.estrenimiento);
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
