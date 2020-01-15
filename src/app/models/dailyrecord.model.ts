import { PatientModel } from './patient.model';


export class RootDailyRecord {
    success: boolean;
    drs: DailyRecordModel[];
    cuantos: number;
}

export class DailyRecordModel {
    exit: boolean;
    _id: string;
    date: Date;
    patient: PatientModel;
    vitalSigns: VitalSignModel[];
    technicalSupport: any[];
    attitude: any[];
    behavior: any[];
    crisis: any[];
    hygiene: any[];
    meal: any[];
    exitHour: Date;
  }
  
export class VitalSignModel {
    _id: string;
    vitalSign: string;
    date: string;
    value: number;
  }
  