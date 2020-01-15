import { Component, OnInit } from '@angular/core';
import { DailyrecordsService } from '../../services/dailyrecords.service';
import { DailyRecordModel } from 'src/app/models/dailyrecord.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dailyrecords',
  templateUrl: './dailyrecords.component.html',
  styleUrls: ['./dailyrecords.component.css']
})
export class DailyrecordsComponent implements OnInit {

  drs: DailyRecordModel[] = [];
  cargando = false;

  constructor(private dailyrecordsService: DailyrecordsService) { }

  ngOnInit() {
    this.cargando = true;
    this.dailyrecordsService.getDailyRecords()
    .subscribe((resp: any) => {
      this.drs = resp;
      this.cargando = false;
    } )
  }

}
