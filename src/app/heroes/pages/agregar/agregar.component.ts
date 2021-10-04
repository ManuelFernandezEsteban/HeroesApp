import { Component, OnInit, Pipe } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { pipe } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  heroe:Heroe={
    alter_ego:'',
    superhero:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''    
  }

  publishers=[
    {
      id:'DC Comics',
      descripcion:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      descripcion:'Marvel - Comics'
    }
  ]

  constructor(private heroeService:HeroesService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    if ( this.router.url.includes('editar')){
      this.activatedRoute.params.
      pipe(
        switchMap( ({id}) => this.heroeService.getHeroePorId(id))
      ).
      subscribe( heroe=>this.heroe=heroe );
    }
  }

  guardar(){
    if(this.heroe.superhero.trim().length===0){
      return;
    }

    if (this.heroe.id){//editar

      this.heroeService.actualizarHeroe(this.heroe).subscribe(heroe=>console.log('Actualizando',heroe))

    }else{//agregar
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe=>{         
          this.router.navigate(['/heroes/editar',heroe.id]);
      })
    }

    
  }

}
