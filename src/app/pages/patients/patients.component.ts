import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { PatientModel } from '../../models/patient.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: PatientModel[] = [];
  cargando = false;
  p: number = 1;

  constructor(private patientsService: PatientsService) { }

  ngOnInit() {

    this.cargando = true;
    this.patientsService.getPatients()
    .subscribe((resp: any) => {
      this.patients = resp;
      this.cargando = false;
    } )

    
    }

    bajaPatient( patient: PatientModel, i: number){

      Swal.fire({
        title: '¿Está seguro?',
        text: `Está seguro que desea dar de baja a ${patient.name} ${patient.lastName}`,
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
            'Se ha dado de baja al paciente.',
            'success'
          )
          this.patients.splice(i, 1);
          this.patientsService.bajaPatient( patient._id).subscribe();
        }
      })

      
    }
  }
