//interface necsaria para mostrar datos del usuario
export interface User {
    idUser: number;
    name:   string;
    email:  string;
    role:   string;
    active: number;
    password?:string;
}
