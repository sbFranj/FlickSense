import { Component, Input, OnInit } from '@angular/core';
import { MovieReview, ReviewsDTO } from '../interfaces/moviewReview';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { UserReview } from '../interfaces/userReviews';
import Swal from 'sweetalert2';
import { ReviewService } from '../services/review.service';
import { error } from 'console';
import { Router } from '@angular/router';



@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {

  movieReview:MovieReview={
    movieDTO:{
      idMovie:-1,
      year:0,
      cover:"",
      title:"",
      gender:{
        idGender:-1,
        name:""
      },
      country:""
    },
    reviewsDTO:[]
  }

  userReview:UserReview={
    userDTO:{
      idUser:-1,
      name:"",
      email:"",
      role:"",
      active:-1
    },
    reviewsDTO:[]

  }

  @Input() idm:string = ""

  @Input() idu:string = "";

  role = this.userService.role
  name = this.userService.name

 constructor(private movieService:MovieService,
            private userService:UserService,
            private reviewService:ReviewService,
            private router:Router){}

  delReview(idMovie:string, idUser:string, title:string){
    if(idUser==this.userService.id()){

      Swal.fire({
        title: "Estas seguro de borrar esta critica?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
        confirmButtonColor:"#3C6E99",
        denyButtonColor:"#fec701"
      }).then((result) => {
        if (result.isConfirmed) {
          this.reviewService.delReview(idMovie, idUser, title)
          .subscribe({
            next:(resp=>{
              Swal.fire({
                title: 'Eliminado!',
                icon: 'success',
                iconColor:"#fec701",
                confirmButtonText: 'Volver',
                confirmButtonColor:"#3C6E99",
              }).then((result)=>{
                this.router.navigate([`/movies/${idMovie}/review`])
              })
            }),
            error:(err=>Swal.fire({
              title: 'Error!',
              text: err,
              icon: 'error',
              iconColor:"#fec701",
              confirmButtonText: 'Aceptar',
              confirmButtonColor:"#3C6E99",
            }))
          })
        } else if (result.isDenied) {
          Swal.fire({
            title: 'Cancelado!',
            icon: 'info',
            iconColor:"#fec701",
            confirmButtonText: 'Volver',
            confirmButtonColor:"#3C6E99",
          })
        }
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: "No puedes borrar una critica que no es tuya",
        icon: 'error',
        iconColor:"#fec701",
        confirmButtonText: 'Aceptar',
        confirmButtonColor:"#3C6E99",
      })
    }
  }

 ngOnInit(): void {
  if(this.idm){
    this.movieService.getMovieReview(this.idm)
    .subscribe({
      next:(movieReview => {
        this.movieReview = movieReview
        
      })
    })
  }else if(this.idu){
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
