import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PatientModel, Patient, PhysicalLimitation } from '../../models/patient.model';
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

export class PatientComponent implements OnInit{

  phases: CatalogModel[] = [];
  technicalSupport: CatalogModel[] = [];
  allergies: CatalogModel[] = [];
  diagnosis: CatalogModel[] = [];
  forma:FormGroup;
  patient: PatientModel = new PatientModel();

  constructor(private patientsService: PatientsService, 
        private router: Router,
        private route: ActivatedRoute,
        private catalogsService: CatalogsService) {
    
    this.forma = new FormGroup({
      '_id': new FormControl({value:'', disabled:true}),
      'expedient': new FormControl({value:'', disabled:true}),
      'name': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'lastNameSecond': new FormControl(),
      'birthdate': new FormControl('', Validators.required),
      'registerdate': new FormControl('', Validators.required),
      'phase': new FormControl('', Validators.required),
      'img': new FormControl(),
      'physicalLimitations': new FormArray([
        new FormControl()
      ]),
      'technicalSupport': new FormArray([]),
      'allergies': new FormArray([]),
      'diagnosis': new FormArray([])
    })


  }
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');

      this.catalogsService.getCatalogsType('fase')
      .subscribe((resp: any) =>{
        this.phases = resp;
      });
      this.catalogsService.getCatalogsType('apoyo')
      .subscribe((resp: any) =>{
        this.technicalSupport = resp;
      });
      this.catalogsService.getCatalogsType('alergia')
      .subscribe((resp: any) =>{
        this.allergies = resp;
      });
      this.catalogsService.getCatalogsType('diagnostico')
      .subscribe((resp: any) =>{
        this.diagnosis = resp;
      });

      if ( id !== 'nuevo' ){
      this.patientsService.getPatient(id)
      .subscribe( (resp: Patient) => {
        this.forma.setValue(resp.patient);
        //this.forma.controls['_id'].controls = id;
      });


    }

  }


  agregarPl(){
    (<FormArray>this.forma.controls['physicalLimitations']).push(
      new FormControl()
    )
  }

 
  guardar(){
    if ( this.forma.invalid ){
            return;
          }
      
    Swal.fire(
      'Guardando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();

    let peticion: Observable<any>;
    // if ( this.forma.controls._id){
    //   peticion = this.patientsService.actualizarPaciente( this.forma.value);
    //   console.log('actualizar');
    // }
    // else {
    //   peticion = this.patientsService.crearPaciente( this.forma.value);
    //   console.log('guardar');
    // }

    peticion = this.patientsService.crearPaciente( this.cambiarFormaModel(this.forma));
    console.log(this.patient);

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
  
  cambiarFormaModel(form:FormGroup) {

    this.patient.name = form.controls.name.value;
    this.patient.lastName = form.controls.lastName.value;
    this.patient.lastNameSecond = form.controls.lastNameSecond.value;
    this.patient.birthdate = form.controls.birthdate.value;
    this.patient.registerdate = form.controls.registerdate.value;
    this.patient.phase = form.controls.phase.value;
    this.patient.img = "https://img.icons8.com/color/48/000000/matrix-architect.png";

    this.patient.physicalLimitations = form.controls.physicalLimitations.value;
    this.patient.technicalSupport = form.controls.technicalSupport.value;
    this.patient.allergies = form.controls.allergies.value;
    this.patient.diagnosis = form.controls.diagnosis.value;

    return this.patient;
    }


    onCheckChange(event) {
      const formArray: FormArray = this.forma.get('technicalSupport') as FormArray;
    
      /* Selected */
      if(event.target.checked){
        // Add a new control in the arrayForm
        formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
        // find the unselected element
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }
          i++;
        });
      }

    }


    onCheckChangeAllergies(event) {
      const formArray: FormArray = this.forma.get('allergies') as FormArray;
    
      /* Selected */
      if(event.target.checked){
        // Add a new control in the arrayForm
        formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
        // find the unselected element
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }
          i++;
        });
      }

    }

    onCheckChangeDiagnosis(event) {
      const formArray: FormArray = this.forma.get('diagnosis') as FormArray;
    
      /* Selected */
      if(event.target.checked){
        // Add a new control in the arrayForm
        formArray.push(new FormControl(event.target.value));
      }
      /* unselected */
      else{
        // find the unselected element
        let i: number = 0;
    
        formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
            // Remove the unselected element from the arrayForm
            formArray.removeAt(i);
            return;
          }
          i++;
        });
      }

    }
  }

