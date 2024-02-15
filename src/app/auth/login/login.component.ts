import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginUser } from '../../interfaces/loginUser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink , Router} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private userService:UserService,
              private fb: FormBuilder,
              private router: Router){}

  myForm: FormGroup = this.fb.group({
    username:["", [Validators.required, Validators.email]],
    password:["", [Validators.required]]
  })  

  goTo(url:string){
    this.router.navigateByUrl(url)
  }

  login(){
    if(this.myForm.valid){
      const {email, password} = this.myForm.value
      console.log(email, password)
      this.userService.login(this.myForm.value)
      .subscribe(
        resp=>{
          console.log(resp)
          if(resp===true){
            this.router.navigateByUrl("/")
          }else{
            //sweet alert
            alert("error en el login")
          }
        }
      )
    }

}
}
