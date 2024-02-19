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
  edit(){
    this.user.password = this.password
   this.userService.putUser(this.user, this.id)
   .subscribe({
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
