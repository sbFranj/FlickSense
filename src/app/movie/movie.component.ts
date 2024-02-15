import { Component, Input, OnInit } from '@angular/core';
import { PageableMovie , Content} from '../interfaces/pageableMovie';
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

  @Input() id:string = ""

  movie!: Content

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    if(this.id){
      this.movieService.getMovie(this.id)
      .subscribe({
        next:(movie=>this.movie = movie)
      })
    }else{
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
