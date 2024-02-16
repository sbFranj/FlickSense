//interface necesaria para mostrar las criticas de un usuario
export interface UserReview {
    userDTO:    UserDTO;
    reviewsDTO: ReviewsDTO[];
}

export interface ReviewsDTO {
    idMovie:    number;
    titleMovie: string;
    title:      string;
    review:     string;
}


export interface UserDTO {
    idUser: number;
    name:   string;
    email:  string;
    role:   string;
    active: number;
}
