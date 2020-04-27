import { Component, OnInit } from '@angular/core';
import { CaregiverModel } from '../../models/caregiver.model';
import { CaregiversService } from '../../services/caregivers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caregivers',
  templateUrl: './caregivers.component.html',
  styleUrls: ['./caregivers.component.css']
})
export class CaregiversComponent implements OnInit {


  caregivers: CaregiverModel[] = [];
  cargando = false;
  p: number = 1;


  constructor(private caregiversService: CaregiversService) { }

  ngOnInit() {

    this.cargando = true;
    this.caregiversService.getCaregivers()
    .subscribe((resp: CaregiverModel[]) => {
      console.log(this.caregivers);
      this.caregivers = resp;
      this.cargando = false;
    } )

  }

  bajaCaregiver( caregiver: CaregiverModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea dar de baja a ${caregiver.name} ${caregiver.lastName}`,
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
          'Se ha dado de baja al cuidador.',
          'success'
        )
        this.caregivers.splice(i, 1);
        this.caregiversService.bajaCaregiver( caregiver._id).subscribe();
      }
    }) 
  }

}
