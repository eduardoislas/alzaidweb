import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootDailyRecord, DailyRecordModel } from '../models/dailyrecord.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DailyrecordsService {

  private url = 'https://alzaid.herokuapp.com';
  // private url2 = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


getDailyRecords(fecha: Date) {
  return this.http.get(`${ this.url }/dailyrecord/date/${fecha}`)
      .pipe(
        map( (resp:any) => {
          return this.crearArreglo(resp);
        })
      );
}

private crearArreglo(drsObj: RootDailyRecord){

  const drs: DailyRecordModel[] = [];

  if ( drsObj.drs === null) {
     return [];
    }else{
      Object.keys( drsObj.drs).forEach( key => {
        const dr: DailyRecordModel = drsObj.drs[key];
       // pat._id = key;
        drs.push(dr);
      }) ;
      return drs;
    }
  }





}