import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaregiverModel, Caregiver, RootCaregiver } from '../models/caregiver.model';
import { map, retry } from 'rxjs/operators';
import * as myglobals from './globals';

@Injectable({
  providedIn: 'root'
})
export class CaregiversService {

  private url = myglobals.url;

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

}
