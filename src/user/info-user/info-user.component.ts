import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import { User } from '../../app/interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info-user.component.html'
})
export class InfoUserComponent implements OnInit{

  constructor(private userService: UserService){}

  user!:User 

  password:string = "******"


  @Input() id:string =""

  ngOnInit(): void {
    this.userService.getUser(this.id)
    .subscribe({
      next:(user=>{
        console.log(user)
        this.user = user
      })
    })
  }
}
