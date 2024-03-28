import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeInfo } from '../interfaces/gradeInfo';
import { Grade } from '../interfaces/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private http : HttpClient) { }
  baseUrl:string = "https://flicksenseapi.onrender.com/grades"

  getGradeInfo(idMovie:string):Observable<GradeInfo>{
    return this.http.get<GradeInfo>(`${this.baseUrl}/${idMovie}`)
  }

  getGrade(idMovie:string, idUser:string):Observable<Grade>{
    return this.http.get<Grade>(`${this.baseUrl}/${idMovie}/${idUser}`)
  }

  postGrade(grade:Grade){
    return this.http.post(`${this.baseUrl}/grade`, grade)
  }

  deleteGrade(idMovie:string, idUser:string){
    return this.http.delete(`${this.baseUrl}/del/${idMovie}/${idUser}`)
  }
}
