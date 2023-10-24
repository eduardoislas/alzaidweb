import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogModel } from 'src/app/models/catalog.model';
import { Patient, PatientModel } from 'src/app/models/patient.model';
import { EvaluationModel } from 'src/app/models/scale.model';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { PatientsService } from 'src/app/services/patients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluations: CatalogModel[] = [];
  patient: PatientModel = new PatientModel();
  evaluation: EvaluationModel = new EvaluationModel();
  evaluationsPatient: EvaluationModel[] = [];

  constructor(private patientsService: PatientsService,
    private router: Router,
    private route: ActivatedRoute,
    private catalogsService: CatalogsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.catalogsService.getCatalogsType('Evaluacion')
      .subscribe((resp: any) => {
        this.evaluations = resp;
      });

      this.patientsService.getPatient(id)
      .subscribe((resp: Patient) => {
        if (resp.patient !== null) {
          this.patient = resp.patient;
          this.patient._id = id;
        } else {
          console.log("Error fetching patient");
          Swal.fire({
            icon: 'error',
            title: 'Error obteniendo datos, intente de nuevo'
          });
        }
      });

      this.patientsService.obtenerEvaluacionesByID(id)
      .subscribe((resp:any)=> {
        this.evaluationsPatient = resp;
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

    this.evaluation.evaluationName = form.controls.evaluationName.value;
    this.evaluation.date = form.controls.date.value;
    this.evaluation.patient = this.patient;
    this.evaluation.patientPhase = form.controls.phase.value;
    this.evaluation.score = form.controls.score.value;

    let peticion: Observable<any> = this.patientsService.createEvaluation(
      this.evaluation
    );

    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.evaluation.evaluationName,
        text: 'Se guardó correctamente'
      });
      // this.router.navigateByUrl('/patients'); 
      this.ngOnInit();
      // this.router.navigate([this.router.url]);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar la evaluación'
      });
    });
  }

  bajaEvaluation( eva: EvaluationModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar la evaluación ${eva.evaluationName}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, adelante!'
    }).then((res) => {
      if (res.value) {
        this.patientsService.bajaEvaluation( eva._id).subscribe(
          () => {
            this.evaluationsPatient.splice(i, 1);
            this.ngOnInit();
          Swal.fire('Eliminación', 'Se ha eliminado la evaluación.', 'success');
        },
        (error) => {
          Swal.fire('Error', 'No se pudo eliminar la evaluación.', 'error');
          console.error('Error al eliminar la evaluación:', error);
        }
      )}
    });
  }

}
