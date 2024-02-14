import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import { User } from '../../app/interfaces/user';

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
