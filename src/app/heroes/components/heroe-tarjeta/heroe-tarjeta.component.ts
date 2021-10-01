import { Component, Input, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
  ]
})
export class HeroeTarjetaComponent implements OnInit {

  @Input('heroe') heroe:Heroe={
    id:'',
    superhero:'',
    publisher:Publisher.DCComics,
    alter_ego:'',
    first_appearance:'',
    characters:'',
    alt_img:''    
  }
  constructor() { }

  ngOnInit(): void {
  }

}
