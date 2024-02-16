import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser } from '../../interfaces/registerUser';
import { UserService } from '../../services/user.service';
import { ValidateEmailService } from '../../validators/validate-email';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  user!:RegisterUser
  constructor(private fb:FormBuilder,
              private validatorEmail: ValidateEmailService,
              private userService:UserService,
              private router:Router){}

  myForm: FormGroup = this.fb.group({
    name:["",[Validators.required]],
    email:["",[Validators.required, Validators.email], [this.validatorEmail]],
    password:["",[Validators.required]]
  })

  invalidField(field: string){
    return this.myForm.get(field)?.invalid 
            && this.myForm.get(field)?.touched;
  }

  get emailErrorMsg():string{
    const errors = this.myForm.get("email")?.errors
    let errorMsg :string = "";
    if(errors){
      if(errors["required"]){
        errorMsg = "El email es obligatorio"
      }else if(errors["email"]){
        errorMsg = "El email no tiene formato de email"
      }else if(errors["emailTaken"]){
        errorMsg = "El email ya está en uso"
      }
    }

    return errorMsg
  }



  submit(){
    this.myForm.markAsUntouched()
    if(!this.myForm.invalid){
      const {email, password, name} = this.myForm.value
      const user = {
        email:email,
        password:password,
        name:name,
        active:1,
        role:"user"
      }
      this.userService.register(user)
      .subscribe({
        next:(user=>{
          this.router.navigateByUrl("/auth/login")
        })
      })
    }
  }
}
