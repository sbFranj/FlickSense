import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl:string = "http://localhost:9090/reviews"
  constructor(private http: HttpClient) { }

  postReview(review:Review):Observable<any>{
    return this.http.post(`${this.baseUrl}/add`, review)
  }
}
