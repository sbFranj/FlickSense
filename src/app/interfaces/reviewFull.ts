export interface ReviewFull {
    movie:  Movie;
    user:   User;
    title:  string;
    review: string;
}

export interface Movie {
    idMovie: number;
    year:    number;
    cover:   string;
    title:   string;
    gender:  Gender;
    country: string;
}

export interface Gender {
    idGender: number;
    name:     string;
}

export interface User {
    idUser: number;
    name:   string;
    email:  string;
    role:   string;
    active: number;
}
