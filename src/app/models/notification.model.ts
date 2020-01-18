import { PatientModel } from './patient.model';


export class RootNotification {
    success: boolean;
    vigentes: NotificationModel[];
    count: number;
  }
  
export class NotificationModel {
    high_priority: boolean;
    area: string[];
    status: boolean;
    _id: string;
    date: string;
    expiration_date: Date;
    description: string;
    type: string;
    patient: PatientModel;
    user: string;
    __v: number;
  }
