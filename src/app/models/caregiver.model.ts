import { PatientModel } from './patient.model';
import { UsuarioModel } from './user.model';

export class CaregiverModel{

    _id?: string;
    name: string;
    lastName: string;
    lastNameSecond?: string;
    birthdate?: Date;
    age?: number;
    gender?: string;
    civilStatus?: string;
    religion?: string;
    school?: string;
    occupation?: string;
    phone?: string;
    email?: string;
    patient: PatientModel;
    relation: string;
    username: string;
    password: string;
    registerdate?: Date;
}

export class CaregiverAPIModel{

    _id: string;
    name: string;
    lastName: string;
    lastNameSecond?: string;
    birthdate?: Date;
    age?: number;
    gender?: string;
    civilStatus?: string;
    religion?: string;
    school?: string;
    occupation?: string;
    phone?: string;
    email?: string;
    patient: PatientModel;
    relation: string;
    user: UsuarioModel;
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

