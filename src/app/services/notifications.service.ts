import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RootNotification, NotificationModel } from '../models/notification.model';
import * as myglobals from './globals';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private url = myglobals.url;

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
