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

  //usamos el output para comunicar este componente con su padre
  @Output() sendSearch:EventEmitter<string> = new EventEmitter<string>();

  //con el metodo enviamos la busqueda 
  enviarBusqueda(){
    console.log("hijo", this.busqueda)
    this.sendSearch.emit(this.busqueda)
  }

}
