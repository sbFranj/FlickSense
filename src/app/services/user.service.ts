import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { UserReview } from '../interfaces/userReviews';
import { LoginUser } from '../interfaces/loginUser';


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

  toLocalStorage(resp : any){
    localStorage.setItem("token", resp.token);
  }

  login(emailAndPassword:any):Observable<any>{
     return this.http.post("http://localhost:9090/loginuser",emailAndPassword)
     .pipe(
       tap(resp=>{
         this.toLocalStorage(resp)
         console.log(resp)
       }),
       map(resp=>true),
       catchError(err => of(err.error.msg))
     )
    
  }
}
