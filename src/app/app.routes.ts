import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { ReviewComponent } from './review/review.component';

export const routes: Routes = [

    {path: "movies", component: MovieComponent},
    {path:"movies/:id/review",component : ReviewComponent}
];
