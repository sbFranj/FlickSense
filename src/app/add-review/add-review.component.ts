import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../interfaces/pageableMovie';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../interfaces/review';
import { UserService } from '../services/user.service';
import { ReviewService } from '../services/review.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.component.html'
})
export class AddReviewComponent implements OnInit{

  @Input() idMovie:string =""
  @Input() idUser:string =""
  @Input() title:string = ""

  movie:Content={
    idMovie:-1,
    year:-1,
    cover:"",
    title:"",
    gender:{
      idGender:-1,
      name:""
    },
    country:""
  }
  titles:string ="";

  myForm:FormGroup = this.fb.group({
    title:["", [Validators.required]],
    review:["", [Validators.required]]
  })

  invalidField(field: string){
    return this.myForm.get(field)?.invalid 
            && this.myForm.get(field)?.touched;
  }

  constructor(private movieService:MovieService,
              private fb : FormBuilder,
              private userService:UserService,
              private reviewService:ReviewService,
              private router:Router){}

  ngOnInit(): void {
    if(this.idUser){
      console.log(this.idMovie, this.idUser, this.title)
      this.reviewService.getReview(this.idMovie, this.idUser, this.title)
      .subscribe({
        next:(review => {
          console.log(review)
          this.myForm.reset({title:review.title, review:review.review} )
          console.log(review.title)
          this.movie = review.movie
          
        })
    })
    }else{
      this.movieService.getMovie(this.idMovie)
      .subscribe({
        next:(movie=>this.movie = movie)
      })
    }
  }

  submit(){
    this.myForm.markAllAsTouched()
    if(this.myForm.valid){
      if(this.idUser){
        if(this.movie.idMovie==parseInt(this.idMovie) 
            && this.idUser==this.userService.id()
            && this.title == this.myForm.controls["title"].value){
              const {title, review} = this.myForm.value
              const reviewDTO:Review ={
                idMovie:this.movie.idMovie,
                idUser:parseInt(this.userService.id()),
                title:title,
                review:review
              }
              this.reviewService.putReview(reviewDTO)
              .subscribe({
                next:(review=>{
                  this.router.navigateByUrl(`/users/${this.userService.id()}/review`)
                })
              })
          }else{  
            Swal.fire({
              title: 'Error!',
              text: "No puedes editar una critica de otro usuario",
              icon: 'error',
              iconColor:"#fec701",
              confirmButtonText: 'Confirmar',
              confirmButtonColor:"#3C6E99",
            })
          }

      }else{

        const {title, review} = this.myForm.value
        const reviewDTO:Review ={
          idMovie:this.movie.idMovie,
          idUser:parseInt(this.userService.id()),
          title:title,
          review:review
          
        }
        console.log(reviewDTO)
        this.reviewService.postReview(reviewDTO)
        .subscribe({
          next:(review =>{
            this.router.navigateByUrl(`/users/${review.user.idUser}/review`)
          })
        })
      }
    }
  }

}
