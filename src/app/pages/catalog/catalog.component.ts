import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogModel, Catalog } from '../../models/catalog.model';
import { CatalogsService } from '../../services/catalogs.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {


  catalog = new CatalogModel();
  tipos = [];
  clasesAct = [];


  constructor(private router: Router,
    private route: ActivatedRoute,
    private catalogsService: CatalogsService) { }

    
  ngOnInit() {
    this.tipos = ['Actividad', 'Alergia', 'Apoyo técnico', 'Comportamiento', 'Conducta', 'Crisis', 'Diagnostico',
          'Fase', 'Medicina'];
    this.clasesAct = ['Atención', 'Cálculo', 'Estimulación Sensorial', 'Fisioterapia', 'Lenguaje',
          'Memoria', 'Reminiscencia'];

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

    peticion = this.catalogsService.crearCatalog( this.catalog);
  
    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.catalog.name,
        text: 'Se actualizó correctamente'
      });
      this.router.navigateByUrl('/catalogs'); 
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el catálogo',
        text: err.error.err.message
      });
    });
  }
 
}
