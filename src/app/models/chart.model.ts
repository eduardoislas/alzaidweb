
export class RootQuery {
    success: boolean;
    cuantos: number;
    records: RecordModel[];
}


export class RecordModel{
        //Datos paciente
        id_patient: string;
        name: string;
        lastName: string;
        lastNameSecond: string;
        gender: string;
        phase: string;
        //Datos daily record
        dateDR: Date;
        //Datos higiene
        h_incidence: string;
        h_time: string;
        h_observation: string;

}