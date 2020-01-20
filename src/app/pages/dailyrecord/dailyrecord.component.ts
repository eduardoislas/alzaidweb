import { Component, OnInit } from '@angular/core';
import { DailyRecordModel, DailyRecord } from 'src/app/models/dailyrecord.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DailyrecordsService } from '../../services/dailyrecords.service';

@Component({
  selector: 'app-dailyrecord',
  templateUrl: './dailyrecord.component.html',
  styleUrls: ['./dailyrecord.component.css']
})
export class DailyrecordComponent implements OnInit {

  dr = new DailyRecordModel();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private drsService: DailyrecordsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.drsService.getDailyRecord(id)
      .subscribe( (resp: DailyRecord) => {
        this.dr = resp.dr;
        this.dr._id = id;
        console.log(this.dr);
      });

  }

}
