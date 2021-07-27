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
    // {scaleType: 1, scale: 'Autoeficacia', alias: 'RSCSE'},
    {scaleType: 1, scale: 'Resiliencia', alias: 'CD-RISC'},
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
        this.valorations.forEach(v => {
          if (!v.status){
            let index = this.valorations.indexOf(v);
            this.valorations.splice(index,1);
          }
        });
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
      }else if(escala.scaleType === 1){
        this.router.navigate(['/cdrisc', {idv: this.idVal}]);
      }else if(escala.scaleType === 2){
        this.router.navigate(['/hada', {idv: this.idVal}]);
      }else if(escala.scaleType === 3){
        this.router.navigate(['/cesd', {idv: this.idVal}]);
      }else if(escala.scaleType === 4){
        this.router.navigate(['/zarit', {idv: this.idVal}]);
      }else if(escala.scaleType === 5){
        this.router.navigate(['/duke', {idv: this.idVal}]);
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Opción incorrecta',
          text: 'Seleccionar otra opción'
        });
      }
    });
  }
}
