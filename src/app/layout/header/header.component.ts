import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchComponent } from '../../search/search.component';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  //nombre del usuario logeado
  name:any = ""
  logged:boolean = false
  constructor(private router:Router,
            private userService:UserService){}

  //cuando carga el componente 
  ngOnInit(): void {
    
    //rescata del localstorage el nombre de usuario
    this.userService.update()

    //el nombre es igual a la señal que nos devuelve el nombre de usuario del token
    this.name =  this.userService.email()
    this.name.lenght==0? this.logged=false : this.logged=true   

  }
  //funcion destinada a enviar al componente movie una query de busqueda desde el evento del
 enviarBusqueda(event:string){
     console.log("padre", event)
    this.router.navigateByUrl(`/movies/search/${event}`)
 }

}
