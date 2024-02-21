import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageableMovie , Content} from '../interfaces/pageableMovie';
import { MovieService } from '../services/movie.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit ,OnChanges{

  //pageable de peliculas
  pageableMovie:PageableMovie={
    content:[],
    pageable:{
      pageNumber:-1,
      pageSize:-1,
      sort:{
        empty:false,
        sorted:false,
        unsorted:false
      },
      offset:-1,
      paged:false,
      unpaged:false,
    },
    last:false,
    totalPages:-1,
    totalElements:-1,
    size:-1,
    number:-1,
    sort:{
      empty:false,
      sorted:false,
      unsorted:false
    },
    first:false,
    numberOfElements:-1,
    empty:false
  }
  //array para numerar las paginas
  urls:number[] = []
  //campo de ordenacion
  sortField:string = "year";
  // desc o asc
  order:boolean = true;
  //input que coge la id de la pelicula
  @Input() id:string = ""
  //input que coge la query de busqueda
  @Input() q: string = ""

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
  //aray de peliculas
  movies:Content[]=[]

  role = this.userService.role

  constructor(private movieService: MovieService,
              private router:Router,
              private userService:UserService){}

  //cuando inicia el componente
  ngOnInit(): void {
    
    //si se manda una query da true
    if(this.q){
      console.log("Query:", this.q)
      //mandamos al servicio la query 
      this.movieService.search(this.q)
      .subscribe({
        //seteamos en el array de peliculas las peliculas que contienen en el titulo la query
        next:(movies=> this.movies = movies)
      })
    }
    //si manda una id da true
    else if(this.id){
      //mandamos al servicio la id
      this.movieService.getMovie(this.id)
      .subscribe({
        //seteamos la pelicula en nuestra variable
        next:(movie=>this.movie = movie)
      })
    }else{
      //recogemos todas la peliculas
      this.movieService.getAll("")
      .subscribe({
        next:(pagableMovie => {
          //seteamos el pageable en nuestra variable
          this.pageableMovie = pagableMovie
          //iteramos segun el total de paginas y añadimos los numeros a nuestro array
          for(let i = 1 ; i<= this.pageableMovie.totalPages; i++){
            let url = i
            this.urls.push(url)
          }
        })
      })
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    //si vuelve a cambiar la query repetimos el servicio
    if(this.q){
      console.log("Query:", this.q)
      this.movieService.search(this.q)
      .subscribe({
        next:(movies=> this.movies = movies)
      })
    }
  }

  //funcion destinada a navegar por el pageable
  goTo(page:number, sortField:string = this.sortField){
    //creamos nuestra url segun los campos de pagina, ordenacion y asc/desc
    const url: string = `?pageNumber=${page}&sortField=${sortField}&order=${this.order}`
    //y volvemos a hacer la peticion
    this.movieService.getAll(url)
    .subscribe({
      next:(pagableMovie => {
        console.log(url)
        this.pageableMovie = pagableMovie
      })
    })
  }
  //con esta funcion seteamos el orden y el campo de ordenacion
  setOrder(sortField:string, order:boolean ){
    //si el orden es true da true
    if(order){
      //invertimos el orden
      this.order = !this.order;
    }
    //seteamos el campo de ordenacion 
    this.sortField = sortField;
    //forzamos un go to como tiene por defecto el campo de ordenacion y el orden nos manda a la url correcta
    this.goTo(this.pageableMovie.pageable.pageNumber+1, sortField)
  }

  del(idMovie:string){
    Swal.fire({
      title: "Estas seguro de borrar esta Pelicula?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
      confirmButtonColor:"#3C6E99",
      denyButtonColor:"#fec701"
    }).then((result) => {
      if (result.isConfirmed) {
        this.movieService.delMovie(idMovie)
          .subscribe({
            next:(resp=>{
              Swal.fire({
                title: 'Eliminada!',
                text: "Pelicula eliminada",
                icon: 'success',
                iconColor:"#fec701",
                confirmButtonText: 'Volver',
                confirmButtonColor:"#3C6E99",
              }).then((resp)=>{
                this.router.navigateByUrl("/movies")
                this.goTo(1)
              })
            }),
            error:(err=>{
              Swal.fire({
                title: 'Error!',
                text: err.error.msg,
                icon: 'error',
                iconColor:"#fec701",
                confirmButtonText: 'Volver',
                confirmButtonColor:"#3C6E99",
              })
            })
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
    })

  }

}
