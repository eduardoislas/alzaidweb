import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ValorationsModel } from '../../models/scale.model';
import Swal from 'sweetalert2';
import { ScalesService } from '../../services/scales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valorations',
  templateUrl: './valorations.component.html',
  styleUrls: ['./valorations.component.css']
})
export class ValorationsComponent implements OnInit {

  forma:FormGroup;
  anio = 0;
  valorations: ValorationsModel[] = [];

  constructor(private scalesService: ScalesService, private router: Router) {

    this.forma = new FormGroup({
      'numPeriod': new FormControl('', Validators.required)
    });

   }

  ngOnInit() {
    let fecha = new Date();
    this.anio = fecha.getFullYear();
    this.actualizarValoraciones();
  }



  guardar(){
    if ( this.forma.invalid ){
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Asegúrese de haber seleccionado periodo'
      });
      return;
    }

    Swal.fire(
      'Guardando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();
    this.scalesService.createValoration(this.cambiarFormaModel(this.forma))
    .subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Valoración registrada',
        text: 'Periodo de Valoración registrado correctamente'
      });
      this.actualizarValoraciones();
      this.forma.reset();
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar la actividad',
        text: err
      });
    });   
  }

  cambiarFormaModel(form:FormGroup){
    let val: ValorationsModel = {
      year: this.anio,
      numPeriod: form.controls.numPeriod.value
    };
    if(val.numPeriod==1){
      val.period = "Enero";
    }else if(val.numPeriod==2){
      val.period = "Febrero";
    }
    else if(val.numPeriod==3){
      val.period = "Marzo";
    }
    else if(val.numPeriod==4){
      val.period = "Abril";
    }
    else if(val.numPeriod==5){
      val.period = "Mayo";
    }
    else if(val.numPeriod==6){
      val.period = "Junio";
    }
    else if(val.numPeriod==7){
      val.period = "Julio";
    }
    else if(val.numPeriod==8){
      val.period = "Agosto";
    }
    else if(val.numPeriod==9){
      val.period = "Septiembre";
    }
    else if(val.numPeriod==10){
      val.period = "Octubre";
    }
    else if(val.numPeriod==11){
      val.period = "Noviembre";
    }
    else if(val.numPeriod==12){
      val.period = "Diciembre";
    }
    return val;
  }

  actualizarValoraciones(){
    this.scalesService.getValorations()
    .subscribe((resp: any) => {
      this.valorations = resp.valorations;
    });
  }

  cambiaStatus( valoration: ValorationsModel){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea cambiar el estatus de la valoración?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, adelante!'
    }).then((res) => {
      if (res.value) {
        Swal.fire(
          'Actualizado!',
          'Se ha actualizado la valoración.',
          'success'
        )
        this.scalesService.changeStatus( valoration._id).subscribe(resp => {
          this.actualizarValoraciones();
        });
      }
    });
  }
}

