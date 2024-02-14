import { Component } from '@angular/core';
import { SearchComponent } from '../../search/search.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

}
