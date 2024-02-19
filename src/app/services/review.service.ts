import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Observable } from 'rxjs';
import { ReviewFull } from '../interfaces/reviewFull';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl:string = "http://localhost:9090/reviews"
  constructor(private http: HttpClient) { }

  postReview(review:Review):Observable<any>{
    return this.http.post(`${this.baseUrl}/add`, review)
  }

  getReview(idMovie:string, idUser:string, title:string):Observable<ReviewFull>{
    return this.http.get<ReviewFull>(`${this.baseUrl}/${idMovie}/${idUser}/${title}`)
  }

  putReview(review:Review):Observable<any>{
    return this.http.put(`${this.baseUrl}/edit`, review)
  }

  delReview(idMovie:string, idUser:string, title:string):Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}/del/${idMovie}/${idUser}/${title}`)
  }
}
