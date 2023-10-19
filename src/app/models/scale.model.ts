import { CaregiverAPIModel } from './caregiver.model';
import { PatientModel } from './patient.model';

export class ValorationsModel{
    _id?: string;
    year: number;
    numPeriod: number;
    period?: string;
    status?: boolean;
}

export class RootValorations{
    success: boolean;
    count: number;
    valorations: ValorationsModel[];
}


export class ScaleModel{
    _id?: string;
    date: Date;
    answers: number[];
    score: number;
    scaleType: number;
    scale: string;
    caregiver: CaregiverAPIModel;
    valoration?: ValorationsModel;
}


export class RootScale{
    success: boolean;
    count: number;
    scales: ScaleModel[];
}

export class EvaluationModel{
    _id?: string;
    date: Date;
    score: number;
    evaluationName: string;
    patientPhase: string;
    patient: PatientModel;
}


export class RootEvaluation{
    success: boolean;
    count: number;
    evaluations: EvaluationModel[];
}