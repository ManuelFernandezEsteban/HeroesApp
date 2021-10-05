import { Component, OnInit, Pipe } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { pipe } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
              private router:Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog ) { }

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

      this.heroeService.actualizarHeroe(this.heroe).
        subscribe(heroe=>this.mostrarSnackBar('Registro actualizado'));

    }else{//agregar
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe=>{         
          this.mostrarSnackBar('Heroe agregado')
          this.router.navigate(['/heroes/editar',heroe.id]);
      })
    }
  }

  borrar(){

    const dialog =  this.dialog.open(ConfirmarComponent,{
      width:'300px',
      data:this.heroe
    });
    dialog.afterClosed().subscribe(
      (result)=>{
        if (result){
          this.heroeService.borrarHeroe(this.heroe.id!).subscribe(
            resp=>{
              this.mostrarSnackBar('Registro eliminado');
              this.router.navigate(['/heroes']);
            }
          )
        }
      }
    ) 
      
  }

  mostrarSnackBar(mensaje : string):void{
    this.snackBar.open(mensaje,'Ok!',{
      duration:2000
    });
  }
}
