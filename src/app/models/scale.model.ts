import { CaregiverModel } from './caregiver.model';

export class ValorationsModel{
    _id?: string;
    year: number;
    period: string;
    status?: boolean;
}

export class RootValorations{
    success: boolean;
    count: number;
    valorations: ValorationsModel[];
}


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