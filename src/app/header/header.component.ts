import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { jwtDecode } from "jwt-decode";
import { User } from '../interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent //implements OnInit
{

//  token  = localStorage.getItem("token") || "";
//  decoded =  jwtDecode(this.token)

//  user!:User

//  ngOnInit(): void {
//    const {iat, ...user} = this.decoded;
//    this.user = user as User;
//    console.log(user)
//  }
 enviarBusqueda(event:string){
  console.log("padre", event)
 }

}
