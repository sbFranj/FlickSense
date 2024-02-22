import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser } from '../../interfaces/registerUser';
import { UserService } from '../../services/user.service';
import { ValidateEmailService } from '../../validators/validate-email';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  loading:boolean = false
  constructor(private fb:FormBuilder,
              private validatorEmail: ValidateEmailService,
              private userService:UserService,
              private router:Router){}

  //formulario reactivo con los campos necesarios para registrarse
  myForm: FormGroup = this.fb.group({
    name:["",[Validators.required]],
    email:["",[Validators.required, Validators.email], [this.validatorEmail]],
    password:["",[Validators.required]]
  })

  //si el campo es invalido nos muestra los errores
  invalidField(field: string){
    return this.myForm.get(field)?.invalid 
            && this.myForm.get(field)?.touched;
  }

  //con este metodo filtramos que erro mostrar
  get emailErrorMsg():string{
    //recogemos los errores del campo email
    const errors = this.myForm.get("email")?.errors
    //creamos un mensaje vacio
    let errorMsg :string = "";
    //si tiene errores da true
    if(errors){
      //si tiene errores de require da true
      if(errors["required"]){
        errorMsg = "El email es obligatorio"
      //si tiene errores del formato email da true
      }else if(errors["email"]){
        errorMsg = "El email no tiene formato de email"
      //si el email ya existe da true
      }else if(errors["emailTaken"]){
        errorMsg = "El email ya está en uso"
      }
    }

    return errorMsg
  }

  //metodo para enviar registro a la api
  submit(){
    this.myForm.markAsUntouched()
    //si el formulario es valido da true
    if(!this.myForm.invalid){
      this.loading = true
      //recogemos email, password y name del formulario
      const {email, password, name} = this.myForm.value
      //creamos un usuario de registro con las propiedades que nos hacen falta
      const user: RegisterUser = {
        email:email,
        password:password,
        name:name,
        active:1,
        role:"user"
      }
      //usamos nuestro servicio para enviar nuestro objeto a la api
      this.userService.register(user)
      .subscribe({
        next:(user=>{
          this.loading= false;
          //cuando haga registro lo enviamos al login
          Swal.fire({
            title: 'Registrado!',
            text: "Cuenta creada correctamente",
            icon: 'success',
            iconColor:"#fec701",
            confirmButtonText: 'Ir al Login',
            confirmButtonColor:"#3C6E99",
          }).then(resp=>{
            this.router.navigateByUrl("/auth/login")
          })
          
        }),
        error:(err=>{
          this.loading=false
          Swal.fire({
            title: 'Error!',
            text: err.error.message,
            icon: 'error',
            iconColor:"#fec701",
            confirmButtonText: 'Intentarlo de nuevo',
            confirmButtonColor:"#3C6E99",
        }).then((resp)=>{
          this.router.navigateByUrl("/auth/register")
        })
        })
      })
    }
  }
}
