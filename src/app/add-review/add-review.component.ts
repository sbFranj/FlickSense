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

  myForm:FormGroup = this.fb.group({
    title:["", [Validators.required]],
    review:["", [Validators.required]]
  })
  
  //metodo para enseñar mensaje de error en caso de campo no valido
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
    //si hay idUser da true
    if(this.idUser){
     //buscamos la critica
      this.reviewService.getReview(this.idMovie, this.idUser, this.title)
      .subscribe({
        //en caso de de que exista la seteamos al formulario
        next:(review => {
          console.log(review)
          this.myForm.reset({title:review.title, review:review.review} )
          console.log(review.title)
          this.movie = review.movie
          
        }),
        //en caso contrario nos daria error
        error:(err=>{
          Swal.fire({
            title: 'Error!',
            text: err.error.message,
            icon: 'error',
            iconColor:"#fec701",
            confirmButtonText: 'Intentarlo de nuevo',
            confirmButtonColor:"#3C6E99",
        }).then((resp)=>{
          this.router.navigateByUrl("/movies")
        })
        })
    })
    }else{
      //si no hay idUsuario significa que en vez de editar vamos a crear una critica, entoces buscamos la pelicula
      this.movieService.getMovie(this.idMovie)
      .subscribe({
        //en caso de encontrar la pelicula la seteamos
        next:(movie=>this.movie = movie),
        //en caso contrario nos daria error
        error:(err=>{
          Swal.fire({
            title: 'Error!',
            text: err.error.message,
            icon: 'error',
            iconColor:"#fec701",
            confirmButtonText: 'Intentarlo de nuevo',
            confirmButtonColor:"#3C6E99",
        }).then((resp)=>{
          this.router.navigateByUrl("/movies")
        })
        })
      })
    }
  }

  //metodo para enviar una critica
  submit(){
    //marcamos todos los inputs del formulario
    this.myForm.markAllAsTouched()
    //si el formulario es valido da true
    if(this.myForm.valid){
      //si hay id usuario da true y significa que vamos a editar una critica
      if(this.idUser){
        //si la id de la pelicula que le pasamos por parametro es la misma que la pelicula que hemos buscado,
        //si la id del usuario es la misma que del usuario logeado y el titulo es el mismo que el que está en el formulario,
        //entonces da true
        if(this.movie.idMovie==parseInt(this.idMovie) 
            && this.idUser==this.userService.id()
            && this.title == this.myForm.controls["title"].value){
              //desectructuramos el formulario
              const {title, review} = this.myForm.value
              //creamos una critica con los datos necesarios
              const reviewDTO:Review ={
                idMovie:this.movie.idMovie,
                idUser:parseInt(this.userService.id()),
                title:title,
                review:review
              }
              //llamamos al metodo del servicio
              this.reviewService.putReview(reviewDTO)
              .subscribe({
                //si todo ha ido bien editamos la critica
                next:(review=>{Swal.fire({
                  title: 'Editada!',
                  text: "Critica editada correctamente",
                  icon: 'success',
                  iconColor:"#fec701",
                  confirmButtonText: 'Volver',
                  confirmButtonColor:"#3C6E99",
                }).then((resp)=>{

                  this.router.navigateByUrl(`/users/${this.userService.id()}/review`)
                })
                }),
                //en caso contrario mandamos error
                error:(err=>{
                  Swal.fire({
                    title: 'Error!',
                    text: err.error.message,
                    icon: 'error',
                    iconColor:"#fec701",
                    confirmButtonText: 'Intentarlo de nuevo',
                    confirmButtonColor:"#3C6E99",
                }).then((resp)=>{
                  this.router.navigateByUrl("/movies")
                })
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
      //en caso contario estamos creando una critica    
      }else{
        //recogemos los campos dle formulario
        const {title, review} = this.myForm.value
        //creamos una critica
        const reviewDTO:Review ={
          idMovie:this.movie.idMovie,
          idUser:parseInt(this.userService.id()),
          title:title,
          review:review
          
        }
        //llamamos al metodo del servicio para crear una nueva critica
        this.reviewService.postReview(reviewDTO)
        .subscribe({
          //si todo ha ido bien creamos la critica
          next:(review =>{
            Swal.fire({
              title: 'Creada!',
              text: "Critica creada correctamente",
              icon: 'success',
              iconColor:"#fec701",
              confirmButtonText: 'Volver',
              confirmButtonColor:"#3C6E99",
            }).then(resp=>{

              this.router.navigateByUrl(`/users/${review.user.idUser}/review`)
            })
          }),
          //en caso de error enviamos una alerta
          error:(err=>{
            Swal.fire({
              title: 'Error!',
              text: err.error.message,
              icon: 'error',
              iconColor:"#fec701",
              confirmButtonText: 'Intentarlo de nuevo',
              confirmButtonColor:"#3C6E99",
          }).then((resp)=>{
            this.router.navigateByUrl("/movies")
          })
          })
        })
      }
    }
  }

}
