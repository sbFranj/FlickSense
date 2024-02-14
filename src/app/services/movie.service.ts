import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableMovie } from '../interfaces/pageableMovie';
import { MovieReview } from '../interfaces/moviewReview';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http : HttpClient) { }
  baseUrl:string = "http://localhost:9090/movies"

  getAll(page:string):Observable<PageableMovie>{
    return this.http.get<PageableMovie>(`${this.baseUrl}${page}`)
  }

  getMovieReview(id:string):Observable<MovieReview>{
    return this.http.get<MovieReview>(`${this.baseUrl}/${id}/review`)
  }
}
