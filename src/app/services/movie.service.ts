import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content, Gender, PageableMovie } from '../interfaces/pageableMovie';
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

  getGenders():Observable<Gender[]>{
    return this.http.get<Gender[]>(`${this.baseUrl}/genders`)
  }

  postMovie(movie:Omit<Content, "idMovie">):Observable<Content>{
    return this.http.post<Content>(`${this.baseUrl}/add`,movie)
  }

  delMovie(idMovie:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/del/${idMovie}`)
  }

  putMovie(idMovie:string, movie:Omit<Content, "idMovie">):Observable<any>{
    return this.http.put(`${this.baseUrl}/edit/${idMovie}`, movie)
  }

  addCloudinary(file: File) {
    const url = `https://api.cloudinary.com/v1_1/dgrri2uuj/upload`;
    const unsignedUploadPreset = 'flicksense';
    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('file', file);
    
    return this.http.post<any>(url, fd);
    }
}
