import { Component, OnInit } from '@angular/core';
import { CatalogsService } from '../../services/catalogs.service';
import { CatalogModel } from '../../models/catalog.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {

  catalogs: CatalogModel[] = [];
  cargando = false;
  tipos = [];
  act = false;
  filterSearch= '';
  p: number = 1;

  constructor(private catalogsService: CatalogsService) { }


  ngOnInit() {
    this.tipos = ['Todos','Actividad', 'Alergia', 'Apoyo técnico', 'Conducta','Diagnostico',
          'Fase', 'Medicina'];
    this.cargando = true;
    this.catalogsService.getCatalogs()
    .subscribe((resp: any) => {
      this.catalogs = resp;
      this.cargando = false;
    } )
  }

  onChange(value: string){
    if (value === 'Todos'){
      this.catalogsService.getCatalogs()
    .subscribe((resp: any) => {
      this.catalogs = resp;
      this.cargando = false;
      this.act = false;
    })
  }else{
    this.act = false;
    this.catalogsService.getCatalogsType(value)
    .subscribe((resp: any) => {
      this.catalogs = resp;
      this.cargando = false;
      if(value=='Actividad'){
        this.act = true;
      }else{ this.act = false}
    })
  }
}

  bajaCatalog( catalog: CatalogModel, i: number){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea dar de baja a ${catalog.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, adelante!'
    }).then((res) => {
      if (res.value) {
        Swal.fire(
          'Baja!',
          'Se ha eliminado el catálogo.',
          'success'
        )
        this.catalogs.splice(i, 1);
        this.catalogsService.bajaCatalog( catalog._id).subscribe();
      }
    })

    
  }
}
