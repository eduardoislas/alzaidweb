import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeActivityModel, RootHomeActivity, CaregiverBinnacleModel, RootCaregiverBinnacle, PatientActivityBinnacle, PatientBinnacleModel, RootPatientBinnacle } from '../models/binnacle.model';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BinnaclesService {

    private url = 'https://alzaidapi.acislab.com';
    // private url = 'https://alzaid.herokuapp.com';
    // private url = 'http://74.208.247.106:3000';

  constructor(private http: HttpClient) { }

// Actividades para Paciente
  crearHomeActivity( homeActivity: HomeActivityModel){ 
    return this.http.post(`${ this.url }/binnacle/homeactivity`, homeActivity)
    .pipe(
      map( (resp: any) => {
        homeActivity._id = resp.homeactivityDB._id;
        return homeActivity;
      })
    );
 }

  getHomeActivitiesToday( ){
    return this.http.get<RootHomeActivity>(`${ this.url }/binnacle/homeactivity/today`)
  }

  getHomeActivityById( id: string){
    return this.http.get(`${ this.url }/binnacle/homeactivity/id/${id}`)
  }

  getHomeActivities( ){
    return this.http.get<RootHomeActivity>(`${ this.url }/binnacle/homeactivity`)
  }

  getHomeActivitiesPhase( phase: string){
    return this.http.get<RootHomeActivity>(`${ this.url }/binnacle/homeactivity/${ phase }`)
  }

  bajaHomeActivity( id: string ){
    return this.http.delete(`${ this.url }/binnacle/homeactivity/${ id }`)
  }
////////////////////////////////////////////////
  // Bitácora del Cuidador
  saveCaregiverBinnacle(cbmodel: CaregiverBinnacleModel){
    return this.http.post(`${ this.url }/binnacle/caregiver`, cbmodel)
    .pipe(
      map( (resp: any) => {
        cbmodel._id = resp.cbDB._id;
        return cbmodel;
      })
    );
  }

  getBinnacleCaregiverByID(id: string){
    return this.http.get(`${ this.url }/binnacle/caregiver/${id}`)
    .pipe(
      map( (resp:any) => {
        return this.crearArregloCBs(resp);
      })
    );
   }
   private crearArregloCBs(cbsObj: RootCaregiverBinnacle){
    const cbs: CaregiverBinnacleModel[] = [];
    if ( cbsObj.cbsDB === null) {
       return [];
      }else{
        Object.keys( cbsObj.cbsDB).forEach( key => {
          const cb: CaregiverBinnacleModel = cbsObj.cbsDB[key];
         // pat._id = key;
          cbs.push(cb);
        }) ;
        return cbs;
      }
    }

        //Obtiene bitácora de cuidadores por ID de bitácora
  getCaregiverBinnacleByIdb( id: string){
    return this.http.get(`${ this.url }/binnacle/caregiver/binnacle/${id}`)
  }
////////////////////////////////////////////////////

// Bitácora Actividades Paciente/////////////////////////////
// Buscar una actividad en las realizadas por el paciente
  getPatientActivitiesDone( idp: string, ida: string ){
    return this.http.get(`${ this.url }/binnacle/patient/activitydone/${idp}&${ida}`)
  }

  // Guardar bitácora de actividades paciente
  savePatientBinnacle(bitacora: PatientActivityBinnacle){
    return this.http.post(`${ this.url }/binnacle/patient/activity`, bitacora)
    .pipe(
      map( (resp: any) => {
        bitacora._id = resp.pbDB._id;
        return bitacora;
      })
    );
  }

    //Obtiene bitácora de actividades por ID de bitácora
  getPatientActivityBinnacleByIdb( id: string){
    return this.http.get(`${ this.url }/binnacle/patient/activitybinnacle/${id}`)
  }

    // Obtiene bitácoras de actividades por ID de paciente
  getPatientActivityBinnaclesByIdp( id: string){
    return this.http.get(`${ this.url }/binnacle/patient/activity/${id}`)
  }


  //// Bitácora Paciente//////////////////////////
  // Guardar bitácora paciente
  saveBinnaclePatient(bitacora: PatientBinnacleModel){
    return this.http.post(`${ this.url }/binnacle/patient`, bitacora)
    .pipe(
      map( (resp: any) => {
        bitacora._id = resp.pbDB._id;
        return bitacora;
      })
    );
  }


  getPatientBinnacleByIdb( id: string){
    return this.http.get(`${ this.url }/binnacle/patient/binnacle/${id}`)
  }

  getPatientBinnaclesByIdp( id: string){
    return this.http.get<RootPatientBinnacle>(`${ this.url }/binnacle/patient/${id}`)
  }

}
