import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino:string='';
  heroes:Heroe[]=[];
  heroeSeleccionado!:Heroe;

  constructor(private herosService:HeroesService) { }

  ngOnInit(): void {
  }
  buscando(){
    this.herosService.getSugerencias(this.termino.trim()).
      subscribe(heroes=>this.heroes=heroes)
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    if (event.option.value){
      
      const heroe:Heroe= event.option.value;
      this.termino=heroe.superhero;
      this.herosService.getHeroePorId(heroe.id!)
        .subscribe(heroe=>this.heroeSeleccionado=heroe);
    }
  }
}
