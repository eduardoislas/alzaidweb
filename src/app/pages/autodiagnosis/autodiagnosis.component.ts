import { Component, OnInit } from '@angular/core';
import { ValorationsModel } from '../../models/scale.model';
import { CaregiverAPIModel } from 'src/app/models/caregiver.model';
import { CaregiversService } from 'src/app/services/caregivers.service';
import { ScalesService } from '../../services/scales.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autodiagnosis',
  templateUrl: './autodiagnosis.component.html',
  styleUrls: ['./autodiagnosis.component.css']
})
export class AutodiagnosisComponent implements OnInit {

  cargando = false;
  caregiver: CaregiverAPIModel = new CaregiverAPIModel();
  valorations: ValorationsModel[] = [];
  idVal: string;
  forma:FormGroup;
  mostrar = false;
  escalas = [
    {scaleType: 1, scale: 'Autoeficacia', alias: 'RSCSE'},
    {scaleType: 2, scale: 'Ansiedad', alias: 'HAD-A'},
    {scaleType: 3, scale: 'Depresión', alias: 'CES-D'},
    {scaleType: 4, scale: 'Sobrecarga', alias: 'ZARIT'},
    {scaleType: 5, scale: 'Apoyo social', alias: 'DUKE'}
  ]

  constructor(private caregiversService: CaregiversService, private scalesService: ScalesService,
    private router: Router) {

    this.forma = new FormGroup({
      'valoration': new FormControl('', Validators.required)
    });

   }

  ngOnInit() {
    //Obtener Familiar
    this.caregiversService.getCaregiverByUser(localStorage.getItem('userid'))
        .subscribe((resp:any) => {
          this.caregiver = resp.caregiver[0];
      });

    this.scalesService.getValorations()
      .subscribe((resp:any) => {
        this.valorations = resp.valorations;
      });
  }

  guardar(){

  }


  onChange(value: string){
    this.mostrar = true;
    this.idVal = value;
}

  contestarEscala( escala: any){
    let done: boolean;
    this.scalesService.getScaleDone(this.caregiver._id, escala.scaleType, this.idVal)
    .subscribe((resp: any) => {
      done = resp.success;
      if(done){
        Swal.fire({
          icon: 'info',
          title: 'Instrumento Realizado',
          text: 'Este instrumento ya fue realizado en esta valoración'
        });
      }else if(escala.scaleType == 1){
        this.router.navigate(['/selfdiagnosis', {idv: this.idVal}]);
      }
    });

    if(escala.scaleType > 1){
      Swal.fire({
        icon: 'info',
        title: 'En desarrollo',
        text: 'Este instrumento está en desarrollo'
      });
    }
  }

}
