import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent{

  busqueda:string = ""

  @Output() sendSearch:EventEmitter<string> = new EventEmitter<string>();

  enviarBusqueda(){
    console.log("hijo", this.busqueda)
    this.sendSearch.emit(this.busqueda)
  }

}
