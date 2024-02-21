import { Component, Input, OnInit } from '@angular/core';
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

  @Input("id") idMovie = "";

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

  //metodo para enseñar mensaje de error en caso de campo no valido
  notValid(field: string): boolean{
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }
  
  ngOnInit(): void {
    //cargamos los generos 
    this.movieServie.getGenders()
    .subscribe({
      next:(genders => this.genders = genders)
    })
    //si hay idMovie da true
    if(this.idMovie){
      //recuperamos la pelicula por la id
      this.movieServie.getMovie(this.idMovie)
      .subscribe({
        //si la encuentra lo seteamos en nuestro formulario
        next:(movie=>{
          const {title, year, gender, cover, country} = movie
          const {idGender, name} = gender

          this.imageUrl = cover
          this.myForm.reset({title, year, idGender, country})
        }),
        //en caso contrario mandamos mensaje de error
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

  // getFile(event: Event) {
  //   const input: HTMLInputElement = <HTMLInputElement>event.target;
  //   if (input.files && input.files[0]) {
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.movieServie.addCloudinary(e.target.result)
  //       .subscribe({
  //           next : (resp=>{
  //           console.log(resp.url)
  //           this.imageUrl = resp.url
  //         })  
  //       })
  //     }
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

    //metodo para editar una pelicula
    edit(){
      //recogemos la imagen
      let input = document.getElementById("cover") as HTMLInputElement
      //si hay imagen da true
      if (input.files && input.files[0]) {
        //creamos un lector de ficheros
        let reader = new FileReader();
        //leemos el fichero
        reader.onload = (e: any) => {
          //pasamos a nuestro metodo de subida de archivos el fichero en partfile
          this.movieServie.addCloudinary(e.target.result)
          .subscribe({
              next : (resp=>{
                //seteamos la url de la respuesta de cloudinary a nuestra imageUrl
              this.imageUrl = resp.url
              //desestructuramos nuestro formulario
              let {cover, title, year, idGender, country} = this.myForm.value
              //le seteamos a la variable cover la url
              cover = this.imageUrl
              //mandamos a nuestro servicio todos los campos a editar
              this.movieServie.putMovie(this.idMovie, {cover, title, year, gender:{idGender, name:""}, country})
              .subscribe({
                  //en caso de que todo haya ido bien
                  next:(movie =>{
                  console.log(movie)
                  //informamos con un alert
                  Swal.fire({
                    title: 'Editada!',
                    text: "Pelicula editada correctamente",
                    icon: 'success',
                    iconColor:"#fec701",
                    confirmButtonText: 'Volver',
                    confirmButtonColor:"#3C6E99",
                  }).then((resp)=>{
                      this.router.navigateByUrl("/movies/edit/"+this.idMovie)
                  })
                  }),
                  //en caso contrario informamos del error
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
            })  
          })
        }
        reader.readAsDataURL(input.files[0]);
        //si no le pasa imagen hacemos todo igual pero sin usar el metodo de subir a cloudinary
      }else{
        let {cover, title, year, idGender, country} = this.myForm.value
        cover = this.imageUrl      
        this.movieServie.putMovie(this.idMovie,{cover, title, year, gender:{idGender, name:""}, country})
      .subscribe({
        next:(movie =>{
          console.log(movie)
          Swal.fire({
            title: 'Editado!',
            text: "Pelicula editada correctamente",
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

    //metodo para enviar una pelicula, funciona igual que el de editar, pero usando postMovie en vez de putMovie
    submit(){
      let input = document.getElementById("cover") as HTMLInputElement
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.movieServie.addCloudinary(e.target.result)
          .subscribe({
              next : (resp=>{
              console.log(resp.url)
              this.imageUrl = resp.url
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
              this.router.navigateByUrl("/movies/"+movie.idMovie)
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
            })  
          })
        }
        reader.readAsDataURL(input.files[0]);
      }else{
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
              this.router.navigateByUrl("/movies/"+movie.idMovie)
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
    
    

}
