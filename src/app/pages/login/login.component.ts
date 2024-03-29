import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel, LoginModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if ( localStorage.getItem('username')){
      this.usuario.name = localStorage.getItem('username');
      this.recordarme = true;
    } 
  }

  login(form: NgForm ) {
    if ( form.invalid ) { 
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Favor de completar los datos'
      });  
    }

    Swal.fire(
      'Verificando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();

    this.auth.login( this.usuario)
    .subscribe( resp => {
      Swal.close();
      localStorage.setItem('username', this.usuario.name);
      localStorage.setItem('recordarme', this.recordarme.toString());
      localStorage.setItem('token', resp.token);

      if(resp.user.role=='FAMILIAR'){
        this.router.navigateByUrl('/homecaregiver')
      }else{
        this.router.navigateByUrl('/home');
      }
      
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: 'Ocurrió un error, intentar de nuevo'
      });
    });
    
  }

}
