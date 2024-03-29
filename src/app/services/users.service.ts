import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel, RootUser, User } from '../models/user.model';
import * as myglobals from './globals';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = myglobals.url;

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${ this.url }/user`)
        .pipe(
          map( (resp:any) => {
            return this.crearArreglo(resp);
          })
        );
  }

  private crearArreglo(usersObj: RootUser){

    const users: UsuarioModel[] = [];

    if ( usersObj.users === null) {
       return [];
      }else{
        Object.keys( usersObj.users ).forEach( key => {
          const us: UsuarioModel = usersObj.users[key];
         // pat._id = key;
          users.push(us);
        }) ;
        return users;
      }
    }


    getUser( id: string ){
      return this.http.get<User>(`${ this.url }/user/${ id }`)
    }

    getUserName( name: string ){
      return this.http.get<User>(`${ this.url }/user/name/${ name }`)
    }


    crearUser( user: UsuarioModel){ 
      return this.http.post(`${ this.url }/user`, user)
      .pipe(
        map( (resp: any) => {
          user._id = resp.user._id;
          return user;
        })
      );
   }

    actualizarUser( user: UsuarioModel) {
      const userTemp = {
        ...user
      };
      delete userTemp._id;
      return this.http.put(`${ this.url }/user/${user._id}`, userTemp);
    }


    bajaUser( id: string ){

      return this.http.delete(`${ this.url }/user/${ id }`)

    }

    actualizaPassUser( id: string, user: UsuarioModel ){
      return this.http.put(`${ this.url }/user/pass/${ id }`, user)
    }

}
