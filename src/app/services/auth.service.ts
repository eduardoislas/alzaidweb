import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/user.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://alzaid.herokuapp.com/';

  userToken: string;

  // Login
  // https://alzaid.herokuapp.com/login
  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel) {
      return this.http.post(`${ this.url }login`, usuario)
      .pipe(
        map(resp => {
          this.guardarToken( resp['token']);
          return resp;
        })
      );
  }

  private guardarToken( token: string ){
    localStorage.setItem('token', token);

    let hoy = new Date();
    hoy.setSeconds(43200);

    localStorage.setItem('expira', hoy.getTime().toString())
  }

  leerToken(){
    if ( localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean{
    if (this.userToken.length <2 ){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()){
      return true;
    } else{
      return false;
    }
  }
}
