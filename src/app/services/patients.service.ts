import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientModel, RootPatient, Patient } from '../models/patient.model';
import { map } from 'rxjs/operators';
import * as myglobals from './globals';
import { EvaluationModel, RootEvaluation } from '../models/scale.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private url = myglobals.url;

  constructor( private http: HttpClient) { }

  crearPaciente( patient: PatientModel){ 
     return this.http.post(`${ this.url }/patient`, patient)
     .pipe(
       map( (resp: any) => {
         patient._id = resp.patient._id;
         return patient;
       })
     );
  }


  actualizarPaciente( patient: PatientModel) {

    const patientTemp = {
      ...patient
    };

    delete patient._id;

    return this.http.put(`${ this.url }/patient/${patient._id}`, patientTemp);
  }


  getPatient( id: string ){
    return this.http.get<Patient>(`${ this.url }/patient/id/${ id }`)
  }


  getPatients() {
    return this.http.get(`${ this.url }/patient`)
        .pipe(
          map( (resp:any) => {
            return this.crearArreglo(resp);
          })
        );
  }

  private crearArreglo(patientsObj: RootPatient){

    const patients: PatientModel[] = [];

    if ( patientsObj.patients === null) {
       return [];
      }else{
        Object.keys( patientsObj.patients).forEach( key => {
          const pat: PatientModel = patientsObj.patients[key];
         // pat._id = key;
          patients.push(pat);
        }) ;
        return patients;
      }

    
    }

    bajaPatient( id: string ){

      return this.http.delete(`${ this.url }/patient/${ id }`)

    }

    putPatientAssistance(id: string, assistance: boolean) {
      return this.http.put(`${this.url}/patient/assistance/${id}`, {
        assistance
      });
    }

    changePhasePatient(id: string, newPhase: string){
      return this.http.put(`${this.url}/patient/changephase/${id}`, {
        newPhase
      });
    }

    // Crear evaluación de un paciente
    createEvaluation(evaluation: EvaluationModel){
      return this.http.post(`${ this.url }/patient/evaluation`, evaluation)
        .pipe(
          map( (resp: any) => {
            evaluation._id = resp.evaluation._id;
            return evaluation;
          })
        );
    }

    // Obtener escalas por ID del cuidador
    obtenerEvaluacionesByID(id: string){
      return this.http.get(`${ this.url }/patient/evaluation/${id}`)
      .pipe(
        map( (resp:any) => {
          return this.crearArregloEvs(resp);
        })
      );
      }
      
    private crearArregloEvs(evObj: RootEvaluation){
      const ev: EvaluationModel[] = [];
      if ( evObj.evaluations === null) {
        return [];
        }else{
          Object.keys( evObj.evaluations).forEach( key => {
            const eva: EvaluationModel = evObj.evaluations[key];
            ev.push(eva);
          }) ;
          return ev;
        }
      }

      // Eliminar evaluaciones
      bajaEvaluation( id: string ){
        return this.http.delete(`${ this.url }/patient/evaluation/${ id }`)
      }

  }

