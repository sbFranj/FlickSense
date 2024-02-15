import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginUser } from '../../interfaces/loginUser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private userService:UserService){}

  user:LoginUser={
    username : "",
    password: ""
  }

  goTo(url:string){

  }

  login(){
    console.log(this.user)
    this.userService.login(this.user)
    .subscribe({
      next:(token => console.log(token))
    })
  }

}
