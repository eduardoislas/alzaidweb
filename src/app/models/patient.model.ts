import { TechnicalSupport } from './dailyrecord.model';



export class PatientModel{

    _id: string;
    expedient: number;
    name: string;
    lastName: string;
    lastNameSecond: string;
    birthdate: Date;
    registerdate: Date;
    phase: string;
    technicalSupport?: TechnicalSupport[];
    diagnosis?: any[];
    allergies?: any[];
    medicines?: any[];
    physicalLimitations?: PhysicalLimitation[];
    img: string;
    
}

export class RootPatient {
    success: boolean;
    patients: PatientModel[];
    count: number;
}

export class Patient {
    success: boolean;
    patient: PatientModel;
}

export class PhysicalLimitation {
    _id: string;
    name: string;
  }