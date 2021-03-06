import { Component, OnInit } from '@angular/core';
import { DailyrecordsService } from '../../services/dailyrecords.service';
import { DailyRecordModel } from 'src/app/models/dailyrecord.model';

@Component({
  selector: 'app-dailyrecords',
  templateUrl: './dailyrecords.component.html',
  styleUrls: ['./dailyrecords.component.css']
})
export class DailyrecordsComponent implements OnInit {

  drs: DailyRecordModel[] = [];
  cargando = false;
  fecha = new Date();
  p: number = 1;

  constructor(private dailyrecordsService: DailyrecordsService) { }

  ngOnInit() {
    this.cargando = true;
    this.dailyrecordsService.getDailyRecords(this.fecha)
    .subscribe((resp: any) => {
      this.drs = resp;
      this.cargando = false;
    } )
  }

}
