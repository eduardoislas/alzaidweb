import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeActivityModel, RootHomeActivity } from '../models/binnacle.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BinnaclesService {

    // private url = 'https://alzaid.herokuapp.com';
    private url = 'http://74.208.247.106:3000';

  constructor(private http: HttpClient) { }


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

  getHomeActivities( ){
    return this.http.get<RootHomeActivity>(`${ this.url }/binnacle/homeactivity`)
  }

  bajaHomeActivity( id: string ){
    return this.http.delete(`${ this.url }/binnacle/homeactivity/${ id }`)
  }

}
