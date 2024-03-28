import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { GradeService } from '../../services/grade.service';
import { Content } from '../../interfaces/pageableMovie';
import { GradeInfo } from '../../interfaces/gradeInfo';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Grade } from '../../interfaces/grade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-grade',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-grade.component.html'
})
export class AddGradeComponent implements OnInit {

  constructor(private movieService:MovieService,
              private gradeService:GradeService,
              private router:Router,
              private userService:UserService){}
  
  @Input() idMovie = "";

  //notas
  rates:number[]=[1,2,3,4,5,6,7,8,9,10]
  //titulo de las notas
  rateTitles:string[] =
  ["Muy mala","Mala","Floja","Regular","Pasable","Interesante","Buena","Notable","Muy buena","Excelente"]

  //id del usuario logeado
  idUser= this.userService.id()

  //pelicula
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
  //informacion de las calificaciones de la pelicula
  gradeInfo:GradeInfo={
    grade:-1,
    title:"",
    totalGrades:0
  }

  //calificacion
  gradeUser:Grade={
    grade:0,
    idMovie:0,
    idUser:0
  }

  ngOnInit(): void {
    //cuando se cargue 
    //actualizamos la id
    if(typeof localStorage != "undefined"){
      this.userService.update()
    }
    //si el usuari logeado tiene una calificacion la seteamos en caso contrario seteamos las id
    this.gradeService.getGrade(this.idMovie, this.idUser)
    .subscribe({
      next:(gradeUser=>{
        this.gradeUser=gradeUser
      }),
      error:(err=>{
        console.log(err.error.message)
        this.gradeUser = {
          grade:-1,
          idMovie:parseInt(this.idMovie),
          idUser:parseInt(this.idUser)
        }
      })
    })
    //rescatamos la pelicula por la id de la ruta y la seteamos
    this.movieService.getMovie(this.idMovie)
    .subscribe({
      next:(movie=>{
        this.movie = movie
      }),
      error:(err=>{ 
        Swal.fire({
        title: 'No encontrada!',
        text: "no hay coincidencias",
        icon: 'info',
        iconColor:"#fec701",
        confirmButtonText: 'Volver',
        confirmButtonColor:"#3C6E99",
      }).then(resp=>{
        this.router.navigateByUrl("/movies")
      })})
      
    })
    //recogemos la nota media y los votos de la pelicula
    this.gradeService.getGradeInfo(this.idMovie)
    .subscribe({
      next:(gradeInfo=>{
        this.gradeInfo = gradeInfo
      }),
      error:err=> 
      Swal.fire({
        title: 'Error',
        text: "No se ha encontrado la nota",
        icon: 'info',
        iconColor:"#fec701",
        confirmButtonText: 'Continuar',
        confirmButtonColor:"#3C6E99",
      })
    })
  }

  //metodo para calcular las estrellas segun la calificacion
  getStars(rate:number){
    let star = "★"
    let emptyStar = "✰"
    let rateStar = ""
    //rellenamos de estrellas completas hasta la nota media redondeando hacia arriba
    for(let i = 0; i<Math.round(rate) ; i++){
      rateStar+=star
    }
    //relenamos de estrellas vacias hasta completar las restantes a 10 estrellas
    for(let i = rateStar.length; i<10 ; i++){
      rateStar+=emptyStar
    }
    return rateStar
  }

  submit(){
    //si se le asigna una calificacion pues se manda el post
    if(this.gradeUser.grade>0){
      this.gradeService.postGrade(this.gradeUser)
      .subscribe({
        next:resp=>{
          this.gradeService.getGradeInfo(this.idMovie)
          .subscribe({
            next:(gradeInfo=>{
              this.gradeInfo = gradeInfo
            }),
            error:err=> 
            Swal.fire({
              title: 'Error',
              text: "No se ha encontrado la nota",
              icon: 'info',
              iconColor:"#fec701",
              confirmButtonText: 'Continuar',
              confirmButtonColor:"#3C6E99",
            })
          })
        },
        error:err=>console.log(err.error.message)
      })
      //en caso contrario se elimina la nota
    }else{
      this.gradeService.deleteGrade(this.idMovie, this.idUser)
      .subscribe({
        next:resp=>{
          this.gradeService.getGradeInfo(this.idMovie)
          .subscribe({
            next:(gradeInfo=>{
              this.gradeInfo = gradeInfo
            }),
            error:err=> 
            Swal.fire({
              title: 'Error',
              text: "No se ha encontrado la nota",
              icon: 'info',
              iconColor:"#fec701",
              confirmButtonText: 'Continuar',
              confirmButtonColor:"#3C6E99",
            })
          })
        },
        error:err=>console.log(err.error.message)
      })
    }
    
  }
  
}