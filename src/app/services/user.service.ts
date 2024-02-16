import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { UserReview } from '../interfaces/userReviews';
import { LoginUser } from '../interfaces/loginUser';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:9090/users"

  email = signal("")
  role = signal("")

  update(){
    this.email.update(resp => jwtDecode(localStorage.getItem("token")|| "").sub || "")
    this.role.update(resp => ((jwtDecode(localStorage.getItem("token")|| "").sub || "") as any).role)
  }

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

  register(user:any):Observable<any>{
    return this.http.post("http://localhost:9090/registeruser", user)
  }

  login(emailAndPassword:any):Observable<any>{
     return this.http.post("http://localhost:9090/loginuser",emailAndPassword)
     .pipe(
       tap(resp=>{
         this.toLocalStorage(resp)
         this.update()
         console.log(resp)
       }),
       map(resp=>true),
       catchError(err => of(err.error.msg))
     )
    
  }
}
