//interface necesaria para el pageable de la seccion de peliculas
export interface PageableMovie {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Content {
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

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
