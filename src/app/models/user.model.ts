

export class UsuarioModel{
    _id: string;
    firstName: string;
    lastName: string;
    lastNameSecond: string;
    name: string;
    password?: string;
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

export class LoginModel{
    success: boolean;
    user: UsuarioModel;
    token: string;
    expiresIn: number;
}