import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterUser } from '../../interfaces/registerUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  user!:RegisterUser
}
