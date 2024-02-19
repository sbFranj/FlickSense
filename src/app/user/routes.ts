import { Routes } from "@angular/router";
import { UserComponent } from "./userList/user.component";
import { InfoUserComponent } from "./info-user/info-user.component";


export const routes: Routes =[
    {path:"", component:UserComponent},
    {path:":id", component:InfoUserComponent}
]