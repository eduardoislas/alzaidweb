import { CaregiverModel } from './caregiver.model';


export class SelfEfficacyModel{
    date: Date;
    answers: number[];
    scale: string;
    caregiver: CaregiverModel;
}
