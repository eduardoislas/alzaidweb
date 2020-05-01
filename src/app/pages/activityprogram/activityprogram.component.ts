import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CatalogModel } from '../../models/catalog.model';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { HomeActivityModel } from '../../models/binnacle.model';
import { BinnaclesService } from '../../services/binnacles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activityprogram',
  templateUrl: './activityprogram.component.html',
  styleUrls: ['./activityprogram.component.css']
})
export class ActivityprogramComponent implements OnInit {

  fechaHoy = new Date();
  forma:FormGroup;
  catalogs: CatalogModel[] = [];
  activities: string[] = [];
  types = ['Atención', 'Cálculo', 'Estimulación sensorial', 'Fisioterapia', 'Lenguaje',
          'Memoria', 'Reminiscencia'];
  phases = ['Inicial', 'Intermedia', 'Avanzada'];
  programadas: HomeActivityModel[] = [];

  constructor(private catalogsService: CatalogsService,
              private binnaclesService: BinnaclesService,
              private router: Router) { 

    this.forma = new FormGroup({
      'date': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'activity': new FormControl('', Validators.required),
      'phase': new FormControl('', Validators.required)
      
    });

  }

  ngOnInit() {

    this.catalogsService.getCatalogsType('Actividad')
    .subscribe((resp: any) => {
      this.catalogs = resp;
    } );

    this.actualizarActividades();

    
  }


  guardar(){
    if ( this.forma.invalid ){
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Asegúrese de haber seleccionado todo lo solicitado'
      });
      return;
    }

    Swal.fire(
      'Guardando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();

    this.binnaclesService.crearHomeActivity(this.cambiarFormaModel(this.forma))
    .subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Actividad registrada',
        text: 'Actividad para el hogar guardada correctamente'
      });
      this.actualizarActividades();
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
    let act: HomeActivityModel = {
      date: form.controls.date.value,
      type: form.controls.type.value,
      activity: form.controls.activity.value,
      phase: form.controls.phase.value
    }
    return act;
  }

  onChange(value: string){
    this.activities = [];
    for(let c of this.catalogs){
      if(c.classification==value){
        this.activities.push(c.name);
      }
    }
}

  actualizarActividades(){
    this.binnaclesService.getHomeActivitiesToday()
    .subscribe((resp: any) => {
      this.programadas = resp.has;
    });
  }
  
  bajaActividad( homeActivity: HomeActivityModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar la actividad "${homeActivity.activity}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, adelante!'
    }).then((res) => {
      if (res.value) {
        Swal.fire(
          'Baja!',
          'Se ha eliminado la actividad.',
          'success'
        )
        this.programadas.splice(i, 1);
        this.binnaclesService.bajaHomeActivity( homeActivity._id).subscribe();
      }
    }) 
  }
}
