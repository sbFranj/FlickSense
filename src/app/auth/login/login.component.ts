import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm,} from '@angular/forms';
import { RouterLink , Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private userService:UserService,
              private router: Router){}

   //con este decorador vemos los cambios en el formulario, cremos nuestro formulario
  @ViewChild("myForm") myForm!: NgForm
  
  //metodo general para pasarle un campo, validamos por este campo si el campo es valido y lo marcamos
  notValid(field: string): boolean{
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  //metodo para ir a una url
  goTo(url:string){
    this.router.navigateByUrl(url)
  }

  //metodo para hacer login
  login(){
    if(this.myForm.valid){
      //usamos nuestro servicio de login y le enviamos los campos del formulario
      //en este caso el username es el correo electronico, ya que nos logeamos con el
      this.userService.login(this.myForm.value)
      .subscribe(
        resp=>{
          console.log(resp)
          //en caso de logueo exitoso mandamos al usuario al index
          if(resp===true){
            this.router.navigateByUrl("/")
          }else{
            Swal.fire({
              title: 'Error!',
              text: "email y/o contraseña erroneos",
              icon: 'error',
              iconColor:"#fec701",
              confirmButtonText: 'Intentarlo de nuevo',
              confirmButtonColor:"#3C6E99",
            })
          }
        }
      )
    }

}
}
