
export interface MovieReview {
    movieDTO:   MovieDTO;
    reviewsDTO: ReviewsDTO[];
}

export interface MovieDTO {
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

export interface ReviewsDTO {
    idUser: number;
    name:   string;
    title:  string;
    review: string;
}
