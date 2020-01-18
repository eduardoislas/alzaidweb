import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notifications: NotificationModel[] = [];
  cargando = false;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {

    this.cargando = true;
    this.notificationsService.getNotifications()
      .subscribe((resp: any) => {
        this.notifications = resp;
        this.cargando = false;
      })
  }

}
