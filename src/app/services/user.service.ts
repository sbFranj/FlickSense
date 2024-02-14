import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserReview } from '../interfaces/userReviews';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:9090/users"

  getAll():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl)
  }

  getUser(id:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  getMovieReview(id:string):Observable<UserReview>{
    return this.http.get<UserReview>(`${this.baseUrl}/${id}/review`)
  }
}
