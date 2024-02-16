import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  users:User[]= []

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getAll()
    .subscribe({
      next:(users=>this.users = users)
    })
  }


}
