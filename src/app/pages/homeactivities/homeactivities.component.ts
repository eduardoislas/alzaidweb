import { Component, OnInit } from '@angular/core';
import { HomeActivityModel } from '../../models/binnacle.model';
import { BinnaclesService } from '../../services/binnacles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homeactivities',
  templateUrl: './homeactivities.component.html',
  styleUrls: ['./homeactivities.component.css']
})
export class HomeactivitiesComponent implements OnInit {

  programadas: HomeActivityModel[] = [];
  cargando = false;
  p: number = 1;

  constructor(private binnaclesService: BinnaclesService) { }

  ngOnInit() {
    this.cargando = true;
    this.binnaclesService.getHomeActivities()
    .subscribe((resp: any) => {
      this.programadas = resp.has;
      this.cargando = false;
    } );
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
