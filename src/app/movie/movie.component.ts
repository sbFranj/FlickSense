import { Component, OnInit } from '@angular/core';
import { PageableMovie } from '../interfaces/pageableMovie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit{

  pageableMovie!:PageableMovie
  urls:number[] = []
  sortField:string = "year";
  order:boolean = true;


  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.movieService.getAll("")
    .subscribe({
      next:(pagableMovie => {
        this.pageableMovie = pagableMovie
        for(let i = 1 ; i<= this.pageableMovie.totalPages; i++){
          let url = i
          this.urls.push(url)
        }
      })
    })
  }
  goTo(page:number, sortField:string = this.sortField){
    const url: string = `?pageNumber=${page}&sortField=${sortField}&order=${this.order}`
    this.movieService.getAll(url)
    .subscribe({
      next:(pagableMovie => {
        console.log(url)
        this.pageableMovie = pagableMovie
      })
    })
  }
  setOrder(sortField:string, order:boolean ){
    if(order){
      this.order = !this.order;
    }
    this.sortField = sortField;
    this.goTo(this.pageableMovie.pageable.pageNumber+1, sortField)
  }

}
