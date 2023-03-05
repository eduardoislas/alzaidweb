import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogModel } from 'src/app/models/catalog.model';
import { Patient, PatientModel } from 'src/app/models/patient.model';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { PatientsService } from 'src/app/services/patients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phase-change',
  templateUrl: './phase-change.component.html',
  styleUrls: ['./phase-change.component.css']
})
export class PhaseChangeComponent implements OnInit {

  phases: CatalogModel[] = [];
  patient: PatientModel = new PatientModel();
  phase: string = "";

  constructor(private patientsService: PatientsService,
    private router: Router,
    private route: ActivatedRoute,
    private catalogsService: CatalogsService) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.catalogsService.getCatalogsType('fase')
      .subscribe((resp: any) => {
        this.phases = resp;
      });

    this.patientsService.getPatient(id)
      .subscribe((resp: Patient) => {
        if (resp.patient !== null) {
          this.patient = resp.patient;
          this.patient._id = id;
          this.phase = this.patient.phase;
        } else {
          console.log("Error fetching patient");
          Swal.fire({
            icon: 'error',
            title: 'Error obteniendo datos, intente de nuevo'
          });
        }

      });
  }

  guardar( form: NgForm){
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
    let peticion: Observable<any> = this.patientsService.changePhasePatient(
      this.patient._id, this.patient.phase
    );

    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.patient.name,
        text: 'Se actualizó correctamente'
      });
      this.router.navigateByUrl('/patients'); 
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo cambiar la fase',
        text: err.error.err.message
      });
    });
  }

}
