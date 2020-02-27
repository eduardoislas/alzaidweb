import { Component, OnInit } from '@angular/core';
import { DailyRecordModel, DailyRecord } from 'src/app/models/dailyrecord.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DailyrecordsService } from '../../services/dailyrecords.service';
import Swal from 'sweetalert2';
import { PatientsService } from '../../services/patients.service';

@Component({
  selector: 'app-dailyrecord',
  templateUrl: './dailyrecord.component.html',
  styleUrls: ['./dailyrecord.component.css']
})
export class DailyrecordComponent implements OnInit {

  dr = new DailyRecordModel();
  idDR = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private drsService: DailyrecordsService, private patientsService: PatientsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.drsService.getDailyRecord(id)
      .subscribe( (resp: DailyRecord) => {
        this.dr = resp.dr;
        this.dr._id = id;
      });
    this.idDR = id;
  }

  darSalida(){
    Swal.fire({
      title: 'Registrar salida',
      text: '¿Seguro desea registrar salida a esta persona?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, adelante!'
    }).then((result) => {
      if (result.value) {
        this.drsService.putDailyRecordSalida(this.idDR)
          .subscribe( (resp: any) => {
        this.patientsService.putPatientAssistance(this.dr.patient._id, false).subscribe();
        Swal.fire(
          'Salida registrada!',
          'Se ha registrado salida correctamente.',
          'success'
        )
        this.router.navigateByUrl('/dailyrecords');
      });
      }
    })
  }
}
