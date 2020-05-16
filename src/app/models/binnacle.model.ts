import { PatientModel } from './patient.model';
import { CaregiverAPIModel } from './caregiver.model';


export class HomeActivityModel{

    _id?: string;
    date: Date;
    type: string;
    activity: string;
    phase: string;
    instructions: string;
    resources: string;
    status?: boolean;
}

export class RootHomeActivity{
    success: boolean;
    count: number;
    has: HomeActivityModel[];
}

export class PatientActivityBinnacle{
    _id?: string;
    date?: Date;
    patient?: PatientModel;
    activity: HomeActivityModel;
    answers: number[];
    difficulty: string;
    observation: string;
}

export class PatientBinnacleModel{
    _id?: string;
    date: Date;
    evacuation?: number;
    urination?: number;
    sleep?: number;
    constipation?: boolean;
    incontinence?: boolean;
    medicine?: string;
    incidence?: string;
    observation?: string;
    behaviors: boolean[];
    patient: PatientModel;
}

export class RootPatientBinnacle{
    success: boolean;
    count: number;
    pbDB: PatientBinnacleModel[];
}

//Bitácora Cuidador
export class CaregiverBinnacleModel{
    _id?: string;
    date: Date;
    answers: number[];
    caregiver: CaregiverAPIModel;
}

export class RootCaregiverBinnacle{
    success: boolean;
    count: number;
    cbsDB: CaregiverBinnacleModel[];
}