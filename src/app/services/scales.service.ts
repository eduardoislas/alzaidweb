import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValorationsModel, RootValorations } from '../models/scale.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScalesService {

  private url = 'https://alzaidapi.acislab.com';
  // private url = 'https://alzaid.herokuapp.com';
  // private url = 'http://74.208.247.106:3000';

  constructor(private http: HttpClient) { }


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

changeStatus(id: string){
  return this.http.delete(`${ this.url }/valoration/${ id }`);
}

}