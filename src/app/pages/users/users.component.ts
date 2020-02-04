import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsuarioModel } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UsuarioModel[] = [];
  cargando = false;
  p: number = 1;
  
  constructor( private usersService: UsersService) { }

  ngOnInit() {

    this.cargando = true;
    this.usersService.getUsers()
    .subscribe((resp: any) => {
      this.users = resp;
      this.cargando = false;
  })
}


bajaUser( user: UsuarioModel, i: number){

  Swal.fire({
    title: '¿Está seguro?',
    text: `Está seguro que desea eliminar a ${user.name}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, adelante!'
  }).then((res) => {
    if (res.value) {
      Swal.fire(
        'Eliminado!',
        'Se ha eliminado al usuario.',
        'success'
      )
      this.users.splice(i, 1);
    this.usersService.bajaUser( user._id).subscribe();
    }
  })

  
}



}