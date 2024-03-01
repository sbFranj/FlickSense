import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  users:User[]= []

  constructor(private userService:UserService){}

  ngOnInit(): void {
    //cargamos todos los usuarios
    this.userService.getAll()
    .subscribe({
      next:(users=>this.users = users)
    })
  }


}
