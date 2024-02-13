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

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.movieService.getAll()
    .subscribe({
      next:(pagableMovie => this.pageableMovie = pagableMovie)
    })
  }

}
