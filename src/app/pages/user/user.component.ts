import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel, User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { CatalogsService } from '../../services/catalogs.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CatalogModel } from '../../models/catalog.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new UsuarioModel();
  roles = [];

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute,
              private catalogsService: CatalogsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    //Llenar lista de roles
    // this.catalogsService.getCatalogsType('rol')
    //   .subscribe((resp: any) =>{
    //     this.roles = resp;
    //   });
      this.roles = ['ADMIN', 'COORDINADOR', 'ENFERMERIA', 'FAMILIAR', 'FASE_INICIAL', 'FASE_INTERMEDIA', 'FASE_AVANZADA','FISIOTERAPIA', 'HIGIENE', 'NUTRICION', 'PSICOLOGO']
    if ( id !== 'nuevo' ){
      this.usersService.getUser(id)
      .subscribe( (resp: User) => {
        this.user = resp.user;
        console.log(this.user);
        this.user._id = id;
      });
    }

  }

  guardar( form: NgForm ){

    if ( form.invalid ){
      return;
    }

    Swal.fire(
      'Guardando',
      'Espere por favor...',
      'info', 
      );
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.user._id) {
      console.log("actualizar");
      peticion = this.usersService.actualizarUser( this.user);
    }
    else {
      console.log("agregar");
      peticion = this.usersService.crearUser( this.user);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.user.name,
        text: 'Se actualizó correctamente'
      });
      this.router.navigateByUrl('/users'); 
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el usuario',
        text: err.error.err.message
      });
    });
  }

}
