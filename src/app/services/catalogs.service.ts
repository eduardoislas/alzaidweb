import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RootCatalog, CatalogModel, Catalog } from '../models/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  // private url = 'https://alzaid.herokuapp.com';
  private url = 'http://74.208.247.106:3000';

  constructor(private http: HttpClient) { }

  getCatalogs() {
    return this.http.get(`${ this.url }/catalog`)
        .pipe(
          map( (resp:any) => {
            return this.crearArreglo(resp);
          })
        );
  }

  getCatalogsType( type: string ) {
    return this.http.get(`${ this.url }/catalog/${type}`)
        .pipe(
          map( (resp:any) => {
            return this.crearArreglo(resp);
          })
        );
  }

  private crearArreglo(catalogsObj: RootCatalog){

    const catalogs: CatalogModel[] = [];

    if ( catalogsObj.catalogs === null) {
       return [];
      }else{
        Object.keys( catalogsObj.catalogs ).forEach( key => {
          const cat: CatalogModel = catalogsObj.catalogs[key];
         // pat._id = key;
         catalogs.push(cat);
        }) ;
        return catalogs;
      }
    }

    getCatalog( id: string ){
      return this.http.get<Catalog>(`${ this.url }/user/id/${ id }`)
    }


    bajaCatalog( id: string ){

      return this.http.delete(`${ this.url }/catalog/${ id }`)

    }

    crearCatalog( catalog: CatalogModel){ 
      return this.http.post(`${ this.url }/catalog`, catalog)
      .pipe(
        map( (resp: any) => {
          catalog._id = resp.catalog._id;
          return catalog;
        })
      );
   }
 
}
 