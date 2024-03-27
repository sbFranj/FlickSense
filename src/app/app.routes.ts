import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { ReviewComponent } from './review/review.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { loggedGuard } from './guardians/logged.guard';
import { adminGuard } from './guardians/admin.guard';
import { loginGuard } from './guardians/login.guard';
import { HomeComponent } from './layout/home/home.component';
import { GetGradeInfoComponent } from './grade/get-grade-info/get-grade-info.component';
import { AddGradeComponent } from './grade/add-grade/add-grade.component';

export const routes: Routes = [

    {path:"", component:HomeComponent},
    {path: "movies", component: MovieComponent},
    {path:"movies/add", component:AddMovieComponent},
    {path:"movies/edit/:id", component:AddMovieComponent},
    {path:"movies/search/:q", component:MovieComponent},
    {path: "movies/:id", component: MovieComponent},
    {path:"movies/:idm/review",component : ReviewComponent},
    {path:"users/:idu/review", component:ReviewComponent},
    {path:"grade/:idMovie", component:AddGradeComponent,  canMatch:[loggedGuard]},
    {
        path:"users",
        loadChildren:()=> import("./user/routes").then(mod=>mod.routes),
        canMatch:[loggedGuard,adminGuard]
    },
    {path:"auth/login", component: LoginComponent, canMatch:[loginGuard]},
    {path:"auth/register", component: RegisterComponent, canMatch:[loginGuard]},
    {path:"addReview/:idMovie", component: AddReviewComponent, canMatch:[loggedGuard]},
    {path:"reviews/edit/:idMovie/:idUser/:title", component: AddReviewComponent, canMatch:[loggedGuard]},
];
