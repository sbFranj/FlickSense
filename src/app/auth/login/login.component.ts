import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginUser } from '../../interfaces/loginUser';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink , Router} from '@angular/router';
import { delay } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private userService:UserService,
              private router: Router){}

  // myForm: FormGroup = this.fb.group({
  //   username:["", [Validators.required, Validators.email]],
  //   password:["", [Validators.required]]
  // })  
  @ViewChild("myForm") myForm!: NgForm

  notValid(field: string): boolean{
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  goTo(url:string){
    this.router.navigateByUrl(url)
  }

  login(){
    if(this.myForm.valid){
      const {username, password} = this.myForm.value
      console.log(username, password)
      this.userService.login(this.myForm.value)
      .subscribe(
        resp=>{
          console.log(resp)
          if(resp===true){
            this.router.navigateByUrl("/movies")
          }else{
            //sweet alert
            alert("error en el login")
          }
        }
      )
    }else{
      
    }

}
}
