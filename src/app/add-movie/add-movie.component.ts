import { Component, OnInit } from '@angular/core';
import { Gender } from '../interfaces/pageableMovie';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent implements OnInit{

  genders:Gender[] = []

  idGender:number =-1;

  imageUrl:string = "";

  constructor(private movieServie:MovieService,
             private fb : FormBuilder,
             private router:Router){}

  myForm : FormGroup = this.fb.group({
    title:["", [Validators.required]],
    year:["", [Validators.required, Validators.min(1895)]],
    cover:[null],
    idGender:["", [Validators.required, Validators.min(0)]],
    country:["", [Validators.required]]
  })

  notValid(field: string): boolean{
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }
  
  ngOnInit(): void {
    this.movieServie.getGenders()
    .subscribe({
      next:(genders => this.genders = genders)
    })
  }

  getFile(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.movieServie.addCloudinary(e.target.result)
        .subscribe({
            next : (resp=>{
            console.log(resp.url)
            this.imageUrl = resp.url
          })  
        })
      }
      reader.readAsDataURL(input.files[0]);
    }
  }


    submit(){
      let {cover, title, year, idGender, country} = this.myForm.value
      cover = this.imageUrl
      console.log({cover, title, year, idGender, country})
      this.movieServie.postMovie({cover, title, year, gender:{idGender, name:""}, country})
      .subscribe({
        next:(movie =>{
          console.log(movie)
          Swal.fire({
            title: 'Añadido!',
            text: "Pelicula añadida correctamente",
            icon: 'success',
            iconColor:"#fec701",
            confirmButtonText: 'Volver',
            confirmButtonColor:"#3C6E99",
          }).then((resp)=>{
              this.router.navigateByUrl("/movies/search/"+title)
          })
        }),
        error:(err=>{
          Swal.fire({
            title: 'Error!',
            text: err.error.message,
            icon: 'error',
            iconColor:"#fec701",
            confirmButtonText: 'Intentarlo de nuevo',
            confirmButtonColor:"#3C6E99",
        })
        })
        
      })
    }
    
    

}
