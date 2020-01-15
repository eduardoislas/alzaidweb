

export class UsuarioModel{
    _id: string;
    name: string;
    password: string;
    role: string;
    
}


export class RootUser {
    success: boolean;
    users: UsuarioModel[];
    count: number;
}


export class User {
    success: boolean;
    user: UsuarioModel;
}