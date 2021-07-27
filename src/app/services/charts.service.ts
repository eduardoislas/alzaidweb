import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RootQuery } from '../models/chart.model';
import * as myglobals from './globals';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private url = myglobals.url;

  constructor(private http: HttpClient, private chartsService: ChartsService) { }


  getBehaviorsById( id: string ){
    return this.http.get<RootQuery>(`${ this.url }/queries/behaviors/${id}`)
  }

  getHygieneById( id: string ){
    return this.http.get<RootQuery>(`${ this.url }/queries/hygiene/${id}`)
  }

//   getBehaviorsById( id: string ){
//   return this.http.get(`${ this.url }/queries/behaviors/${id}`)
// .pipe(
//   map( (resp:any) => {
//     return this.crearArreglo(resp);
//   })
// );
// }

// private crearArreglo(esObj: RootScale){
//   const es: ScaleModel[] = [];
//   if ( esObj.scales === null) {
//      return [];
//     }else{
//       Object.keys( esObj.scales).forEach( key => {
//         const se: ScaleModel = esObj.scales[key];
//        // pat._id = key;
//         es.push(se);
//       }) ;
//       return es;
//     }
//   }

}
