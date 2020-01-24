import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PatientModel, Patient } from '../../models/patient.model';
import { PatientsService } from '../../services/patients.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CatalogsService } from '../../services/catalogs.service';
import { CatalogModel } from 'src/app/models/catalog.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patient = new PatientModel();
  support: CatalogModel[] = [];
  phases: CatalogModel[] = [];
  allergies: CatalogModel[] = [];

  constructor(private patientsService: PatientsService, 
    private router: Router,
    private route: ActivatedRoute,
    private catalogsService: CatalogsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    //Llenar lista de Fases
    this.catalogsService.getCatalogsType('fase')
      .subscribe((resp: any) =>{
        this.phases = resp;
      });

    //Llenar lista de Apoyo técnico
    this.catalogsService.getCatalogsType('apoyo')
      .subscribe((resp: any) =>{
        this.support = resp;
      });
    
      //Llenar lista de Alergias
    this.catalogsService.getCatalogsType('alergia')
    .subscribe((resp: any) =>{
      this.allergies = resp;
    });
    
    if ( id !== 'nuevo' ){
      this.patientsService.getPatient(id)
      .subscribe( (resp: Patient) => {
        this.patient = resp.patient;
        this.patient._id = id;
      });
    }

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

    let peticion: Observable<any>;

    if ( this.patient._id) {
      peticion = this.patientsService.actualizarPaciente( this.patient);
    }
    else {
      peticion = this.patientsService.crearPaciente( this.patient);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.patient.name + ' '+ this.patient.lastName,
        text: 'Se actualizó correctamente'
      });
      this.router.navigateByUrl('/patients'); 
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el paciente',
        text: err.error.err.message
      });
    });
  }
}
