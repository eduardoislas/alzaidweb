import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel, LoginModel } from '../models/user.model';

import { map } from 'rxjs/operators';
import * as myglobals from './globals';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = myglobals.url;

  userToken: string;

  // Login
  // https://alzaid.herokuapp.com/login
  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    if (localStorage.getItem('recordarme')==="false"){
      localStorage.removeItem('username');
    }
  }

  login( usuario: UsuarioModel) {
      return this.http.post(`${ this.url }/login`, usuario)
      .pipe(
        map((resp: LoginModel) => {
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
