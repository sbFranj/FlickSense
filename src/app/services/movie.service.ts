import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content, PageableMovie } from '../interfaces/pageableMovie';
import { MovieDTO, MovieReview } from '../interfaces/moviewReview';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http : HttpClient) { }
  baseUrl:string = "http://localhost:9090/movies"

  getAll(page:string):Observable<PageableMovie>{
    return this.http.get<PageableMovie>(`${this.baseUrl}${page}`)
  }

  getMovie(id:string):Observable<Content>{
    return this.http.get<Content>(`${this.baseUrl}/${id}`)
  }

  getMovieReview(id:string):Observable<MovieReview>{
    return this.http.get<MovieReview>(`${this.baseUrl}/${id}/review`)
  }

  search(q:string):Observable<Content[]>{
    return this.http.get<Content[]>(`${this.baseUrl}/search?q=${q}`)
  }
}
