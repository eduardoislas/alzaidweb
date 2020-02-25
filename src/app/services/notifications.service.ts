import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RootNotification, NotificationModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  // private url = 'https://alzaid.herokuapp.com';
  private url = 'http://74.208.247.106:3000';

  constructor(private http: HttpClient) { }


  getNotifications() {
    return this.http.get(`${ this.url }/notification`)
        .pipe(
          map( (resp:any) => {
            return this.crearArreglo(resp);
          })
        );
  }

  private crearArreglo(notificationsObj: RootNotification){

    const notifications: NotificationModel[] = [];

    if ( notificationsObj.vigentes === null) {
       return [];
      }else{
        Object.keys( notificationsObj.vigentes ).forEach( key => {
          const noti: NotificationModel = notificationsObj.vigentes[key];
         // pat._id = key;
         notifications.push(noti);
        }) ;
        return notifications;
      }
    }

}
