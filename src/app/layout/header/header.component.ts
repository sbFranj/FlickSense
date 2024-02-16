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

  name:any = ""

  constructor(private router:Router,
            private userService:UserService){}

  ngOnInit(): void {
    this.name =  this.userService.email
    
  }
  
  show(){
    console.log((jwtDecode(localStorage.getItem("token")||"")as any ).role)
  }
  
 enviarBusqueda(event:string){
     console.log("padre", event)
    this.router.navigateByUrl(`/movies/search/${event}`)
 }

}
