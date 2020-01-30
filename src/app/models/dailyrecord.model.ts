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
    vitalSigns?: VitalSignModel[];
    technicalSupport?: TechnicalSupport[];
    attitude?: Attitude[];
    behavior?: Behavior[];
    crisis?: Crisis[];
    hygiene?: Hygiene[];
    meal?: Meal[];
    exitHour?: Date;
    enterHour: Date;
    phaseBinnacle?: PhaseBinnacle;
  }

export class DailyRecord {
    success: boolean;
    dr: DailyRecordModel;
}
  
export class VitalSignModel {
    _id: string;
    vitalSign: string;
    date: string;
    value: number;
    valueB:number;
  }

  export class TechnicalSupport {
    _id: string;
    name: string;
  }
  
  export class Attitude {
    _id: string;
    name: string;
    score: number;
    time: string;
  }
  export class Behavior {
    _id: string;
    name: string;
    score: number;
    time: string;
  }

  export class Crisis {
    _id: string;
    name: string;
    time: string;
    observation: string;
  }

  export class Hygiene {
    _id: string;
    name: string;
    time: string;
    observation: string;
  }

  export class Meal {
    _id: string;
    type: string;
    performance: number;
    quantity?: string;
    foodType?: string;
    independence?: number;
    functional?: number;
    chewingPerformance?: number;
  }

  export class PhaseBinnacle{
    orientation: boolean;
    date: boolean;
    observation: string;
    activities: Activity[];
  }

  export class Activity{
    name: string;
    classification: string;
    performance: number;
  }