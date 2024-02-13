import { Component, Input, OnInit } from '@angular/core';
import { MovieReview } from '../interfaces/moviewReviews';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {

  movieReviews:MovieReview[] = []

  @Input() id:string = ""

 constructor(private movieService:MovieService){}

 ngOnInit(): void {
  this.movieService.getMovieReview(this.id)
  .subscribe({
    next:(movieReviews => this.movieReviews = movieReviews)
  })
}

}
