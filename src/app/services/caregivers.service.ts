import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaregiverModel, Caregiver, RootCaregiver } from '../models/caregiver.model';
import { map, retry } from 'rxjs/operators';
import { SelfEfficacyModel, RootSelfEfficacy } from '../models/scale.model';

@Injectable({
  providedIn: 'root'
})
export class CaregiversService {

  // private url = 'https://alzaid.herokuapp.com';
  private url = 'http://74.208.247.106:3000';

  constructor(private http: HttpClient) { }

  crearCaregiver( caregiver: CaregiverModel){ 
    return this.http.post(`${ this.url }/caregiver`, caregiver)
    .pipe(
      map( (resp: any) => {
        caregiver._id = resp.respuestas[1]._id;
        return caregiver;
      })
    );
 }

 getCaregiver( id: string ){
  return this.http.get<Caregiver>(`${ this.url }/caregiver/${ id }`)
  .pipe(
    retry()
  )
}

getCaregiverByUser( userid: string ){
  return this.http.get<Caregiver>(`${ this.url }/caregiver/user/${ userid }`)
}


getCaregivers() {
  return this.http.get(`${ this.url }/caregiver`)
      .pipe(
        map( (resp:any) => {
          return this.crearArreglo(resp);
        })
      );
}

private crearArreglo(caregiversObj: RootCaregiver){

  const caregivers: CaregiverModel[] = [];

  if ( caregiversObj.caregivers === null) {
     return [];
    }else{
      Object.keys( caregiversObj.caregivers).forEach( key => {
        const car: CaregiverModel = caregiversObj.caregivers[key];
       // pat._id = key;
        caregivers.push(car);
      }) ;
      return caregivers;
    }

  
  }

  bajaCaregiver( id: string ){

    return this.http.delete(`${ this.url }/caregiver/${ id }`)

  }



  enviarSelfEfficacy( semodel: SelfEfficacyModel){ 
    return this.http.post(`${ this.url }/caregiver/se`, semodel)
    .pipe(
      map( (resp: any) => {
        semodel._id = resp.selfEfficacy._id;
        return semodel;
      })
    );
 }

 obtenerSelfEfficacyByID(id: string){
  return this.http.get(`${ this.url }/caregiver/se/${id}`)
  .pipe(
    map( (resp:any) => {
      return this.crearArregloSEs(resp);
    })
  );
 }
 private crearArregloSEs(sesObj: RootSelfEfficacy){
  const ses: SelfEfficacyModel[] = [];
  if ( sesObj.sesDB === null) {
     return [];
    }else{
      Object.keys( sesObj.sesDB).forEach( key => {
        const se: SelfEfficacyModel = sesObj.sesDB[key];
       // pat._id = key;
        ses.push(se);
      }) ;
      return ses;
    }
  }
}
