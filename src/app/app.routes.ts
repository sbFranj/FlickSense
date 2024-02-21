import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { ReviewComponent } from './review/review.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddMovieComponent } from './add-movie/add-movie.component';

export const routes: Routes = [

    {path: "movies", component: MovieComponent},
    {path:"movies/add", component:AddMovieComponent},
    {path:"movies/edit/:id", component:AddMovieComponent},
    {path:"movies/search/:q", component:MovieComponent},
    {path: "movies/:id", component: MovieComponent},
    {path:"movies/:idm/review",component : ReviewComponent},
    {
        path:"users",
        loadChildren:()=> import("./user/routes").then(mod=>mod.routes)
    },
    {path:"users/:idu/review", component:ReviewComponent},
    {path:"auth/login", component: LoginComponent},
    {path:"auth/register", component: RegisterComponent},
    {path:"addReview/:idMovie", component: AddReviewComponent},
    {path:"reviews/edit/:idMovie/:idUser/:title", component: AddReviewComponent},
];
