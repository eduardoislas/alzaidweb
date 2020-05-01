

export class HomeActivityModel{

    _id?: string;
    date: Date;
    type: string;
    activity: string;
    phase: string;
    status?: boolean;
}

export class RootHomeActivity{
    success: boolean;
    count: number;
    has: HomeActivityModel[];
}