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

  constructor(private catalogsService: CatalogsService) { }

  ngOnInit() {
    this.cargando = true;
    this.catalogsService.getCatalogs()
    .subscribe((resp: any) => {
      this.catalogs = resp;
      this.cargando = false;
    } )
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
