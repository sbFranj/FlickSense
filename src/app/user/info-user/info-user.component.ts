import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info-user.component.html'
})
export class InfoUserComponent implements OnInit{

  constructor(private userService: UserService,
              private router:Router){}

  user:User={
    active:-1,
    email:"",
    idUser:-1,
    name:"",
    role:"",
  } 
  //usamos esta cadena para presentar una contraseña, pero sin vulnerar informacion
  password:string = "******"

  @Input() id:string =""

  ngOnInit(): void {
    //cargamos al usuario para editarlo
    this.userService.getUser(this.id)
    .subscribe({
      //si ha ido bien el usuario que buscamos en lo seteamos
      next:(user=>{
        this.user = user
      }),
      //en caso contario se le informa
      error:(err=>{
        Swal.fire({
          title: 'Error!',
          text: err.error.message,
          icon: 'error',
          iconColor:"#fec701",
          confirmButtonText: 'Volver',
          confirmButtonColor:"#3C6E99",
      }).then(resp=>{
        this.router.navigateByUrl("/users")
      })
      })
    })
  }


  edit(){
    //se recoge la contraseña y se le setea al usuario
    this.user.password = this.password
    //le pasamos el usuario con los datos
   this.userService.putUser(this.user, this.id)
   .subscribe({
    //si todo ha ido bien informamos y lo redireccionamos
     next:(resp=>{
       Swal.fire({
         title: 'Editado!',
         icon: 'success',
         iconColor:"#fec701",
         confirmButtonText: 'Volver',
         confirmButtonColor:"#3C6E99",
       }).then((resp=>{
         this.router.navigate(["/users"])
       }))
     }),
     //en caso contario se le informa
     error:(err=>{
       Swal.fire({
         title: 'Error!',
         text: err.error.message,
         icon: 'error',
         iconColor:"#fec701",
         confirmButtonText: 'Intentarlo de nuevo',
         confirmButtonColor:"#3C6E99",
       })
     })
   })
   }
}
