import { Patient } from './patient.model';

export class CaregiverModel{

    _id: string;
    name: string;
    lastName: string;
    lastNameSecond?: string;
    birthdate?: Date;
    age?: number;
    gender?: string;
    civilStatus?: string;
    school?: string;
    occupation?: string;
    phone?: string;
    email?: string;
    patient: Patient
    relation: string;
    username: string;
    password: string;
    registerdate?: Date;
}


export class RootCaregiver {
    success: boolean;
    caregivers: CaregiverModel[];
    count: number;
}

export class Caregiver {
    success: boolean;
    respuestas: any[];
}

