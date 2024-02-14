import { Component, Input, OnInit } from '@angular/core';
import { MovieReview, ReviewsDTO } from '../interfaces/moviewReview';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { UserReview } from '../interfaces/userReviews';



@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {

  movieReview!:MovieReview

  userReview!:UserReview

  @Input() idm:string = ""

  @Input() idu:string = "";

 constructor(private movieService:MovieService,
            private userService:UserService){}

 ngOnInit(): void {
  if(this.idm){
    this.movieService.getMovieReview(this.idm)
    .subscribe({
      next:(movieReview => {
        this.movieReview = movieReview
        
      })
    })
  }else {
    this.userService.getMovieReview(this.idu)
    .subscribe({
      next:(userReview =>{
        console.log(userReview)
        this.userReview = userReview
        
      })
    })
  }
}


}
