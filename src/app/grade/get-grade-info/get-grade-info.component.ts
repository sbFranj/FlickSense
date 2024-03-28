import { Component, Input, OnInit } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { GradeInfo } from '../../interfaces/gradeInfo';

@Component({
  selector: 'app-get-grade-info',
  standalone: true,
  imports: [],
  templateUrl: './get-grade-info.component.html'
})
export class GetGradeInfoComponent implements OnInit{

  @Input() idMovie = "";

  gradeInfo:GradeInfo ={
    grade:-1,
    title:"",
    totalGrades:0
  }

  constructor(private gradeService:GradeService){}

  ngOnInit(): void {
    //En el servicio le mandamos la id de la pelicula y nos da la notamedia
    //la seteamos en gradeInfo
    this.gradeService.getGradeInfo(this.idMovie)
    .subscribe({
      next:(gradeInfo=>{
        this.gradeInfo = gradeInfo
      }),
      //error:err=>alert(err.error.message)
    })
  }
}
