import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  forma:FormGroup;
  user: UsuarioModel;

  constructor(private usersService: UsersService) { 

    this.forma = new FormGroup({
      'pass1': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'pass2': new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  ngOnInit() {

    this.usersService.getUser(localStorage.getItem('userid'))
    .subscribe((resp: any) =>{
      this.user = resp.user;
    });

  }


  validarPass(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2);
  }

  guardar(){
    if ( this.forma.invalid ){
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Asegúrese de haber llenado los 2 campos y/o introducir contraseña correcta de al menos 6 caractéres'
      });
      return;
    }
    if(this.validarPass()){
      Swal.fire(
        'Guardando',
        'Espere por favor...',
        'info', 
        );
      Swal.showLoading();
      this.cambiarFormaModel(this.forma);
      this.usersService.actualizaPassUser(this.user._id, this.user).subscribe(resp => {
        Swal.fire({
              icon: 'success',
              title: 'Contraseña actualizada',
              text: 'Registro guardado correctamente'
            });
            this.forma.reset();
          }, (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo guardar el registro',
                  text: err
                });
              });
    }else{
      Swal.fire({
            icon: 'warning',
            title: 'Las contraseñas no coinciden',
            text: 'Las contraseñas deben ser iguales para actualizar el registro'
          });
    }

  }

  cambiarFormaModel(form:FormGroup){
    let pass = form.controls.pass1.value;
    this.user.password = pass;
  }

}
