import { Component, OnChanges, OnInit, SimpleChanges, signal } from '@angular/core';
import { SearchComponent } from '../../search/search.component';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  //nombre del usuario logeado
  name = this.userService.name
  
  constructor(private router:Router,
            private userService:UserService){}

  //cuando carga el componente 
  ngOnInit(): void {
    //actualiza del localstorage el nombre de usuario
    this.userService.update()
    //console.log(jwtDecode(localStorage.getItem("token") || "")  )

  }
  //funcion destinada a enviar al componente movie una query de busqueda desde el evento del
 enviarBusqueda(event:string){
     
    this.router.navigateByUrl(`/movies/search/${event}`)
 }

 //funcion destinada a cerrar sesion
 logout(){
  this.userService.logout()
  this.name = signal("")
  this.router.navigateByUrl("/movies")
 }

}
