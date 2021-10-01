import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card{
      margin-top:15px;
    }
  `
  ]
})
export class ListadoComponent implements OnInit {


  heroes:Heroe[]=[];

  constructor(private heroesServices:HeroesService) { }

  ngOnInit(): void {
    this.heroesServices.getHeroes().subscribe(resp=>{
      this.heroes=resp;
    })
  }

}
