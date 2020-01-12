import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { NgForm } from '@angular/forms';
import { PatientsService } from '../../services/patients.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patient = new PatientModel();

  constructor(private patientsService: PatientsService, private router: Router) { }

  ngOnInit() {
  }

  guardar( form: NgForm ){

    if ( form.invalid ){
      return;
    }
    Swal.fire(
      'Guardando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();

    console.log(this.patient);

    this.patientsService.crearPaciente( this.patient)
    .subscribe( resp => {
      console.log(resp);
      Swal.close();

      Swal.fire({
        icon: 'success',
        title: 'Registro guardado',
        text: 'Paciente registrado correctamente'
      });
      this.router.navigateByUrl('/patients');
    }, (err) => {
      console.log(err.error.err.message);
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el paciente',
        text: err.error.err.message
      });
    });

  }
}
