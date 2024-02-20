import { Component, OnInit } from '@angular/core';
import { Gender } from '../interfaces/pageableMovie';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent implements OnInit{

  genders:Gender[] = []

  idGender:number =-1;

  constructor(private movieServie:MovieService,
             private fb : FormBuilder){}

  myForm : FormGroup = this.fb.group({
    title:["", [Validators.required]],
    year:["", [Validators.required]],
    cover:["", [Validators.required]],
    idGender:["", [Validators.required]],
    country:["", [Validators.required]]
  })
  

  ngOnInit(): void {
    this.movieServie.getGenders()
    .subscribe({
      next:(genders => this.genders = genders)
    })
  }

  submit(){
   console.log(this.myForm.value)
  }

}
