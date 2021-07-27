import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValorationsModel, RootValorations, ScaleModel, RootScale } from '../models/scale.model';
import { map } from 'rxjs/operators';
import * as myglobals from './globals';

@Injectable({
  providedIn: 'root'
})
export class ScalesService {

  private url = myglobals.url;

  constructor(private http: HttpClient, private scalesService: ScalesService) { }


/////////////////////////////////////////////////////

//Crear valoraciones
createValoration(valoration: ValorationsModel){
  return this.http.post(`${ this.url }/valoration`, valoration)
    .pipe(
      map( (resp: any) => {
        valoration._id = resp.valorationDB._id;
        return valoration;
      })
    );
}

getValorations( ){
  return this.http.get<RootValorations>(`${ this.url }/valoration`)
}

getValorationById( id: string ){
  return this.http.get<RootValorations>(`${ this.url }/valoration/${id}`)
}

changeStatus(id: string){
  return this.http.delete(`${ this.url }/valoration/${ id }`);
}

//////////////////// Escalas /////////////////////////
saveScaleAnswers( scale: ScaleModel){ 
  return this.http.post(`${ this.url }/scale`, scale)
  .pipe(
    map( (resp: any) => {
      scale._id = resp.scale._id;
      return scale;
    })
  );
}

// Obtener escalas por ID del cuidador
obtenerScalesByID(id: string){
return this.http.get(`${ this.url }/scale/${id}`)
.pipe(
  map( (resp:any) => {
    return this.crearArregloSEs(resp);
  })
);
}

private crearArregloSEs(esObj: RootScale){
const es: ScaleModel[] = [];
if ( esObj.scales === null) {
   return [];
  }else{
    Object.keys( esObj.scales).forEach( key => {
      const se: ScaleModel = esObj.scales[key];
     // pat._id = key;
      es.push(se);
    }) ;
    return es;
  }
}


// Buscar una escala contestada por el cuidador, de un tipo en cierta valoración
getScaleDone( idc: string, type: number, idv: string ){
  return this.http.get(`${ this.url }/scale/done/${idc}&${type}&${idv}`)
}


getScaleValCare( idc: string, idv: string ){
  return this.http.get(`${ this.url }/scale/val/${idc}&${idv}`)
}
////////////////////////////////////////////


// Obtener cuidadores por valoración
getCaregiversValoration( idv: string){
  return this.http.get(`${ this.url }/scale/valoration/${idv}`)
}


}