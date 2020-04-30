import { CaregiverModel } from './caregiver.model';


export class SelfEfficacyModel{
    _id?: string;
    date: Date;
    answers: number[];
    scale: string;
    caregiver: CaregiverModel;
}


export class RootSelfEfficacy{
    success: boolean;
    count: number;
    sesDB: SelfEfficacyModel[];
}