import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { ReviewComponent } from './review/review.component';
import { UserComponent } from '../user/userList/user.component';
import { InfoUserComponent } from '../user/info-user/info-user.component';

export const routes: Routes = [

    {path: "movies", component: MovieComponent},
    {path:"movies/:idm/review",component : ReviewComponent},
    {path:"users", component: UserComponent},
    {path:"users/:id", component:InfoUserComponent},
    {path:"users/:idu/review", component:ReviewComponent}
];
