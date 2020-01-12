import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientModel } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private url = 'https://alzaid.herokuapp.com/';

  constructor( private http: HttpClient) { }

  crearPaciente( patient: PatientModel){

     return this.http.post(`${ this.url }patient`, patient)
  }



}
