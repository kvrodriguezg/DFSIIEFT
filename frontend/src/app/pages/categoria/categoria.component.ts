import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { RecetasService } from 'src/app/services/recetas.service';

/**
 * Componente que muestra una lista de recetas según
 * la categoría seleccionada en la URL.
 *
 * Permite gestionar favoritos y mostrar detalles en un modal.
 *
 * @export
 * @class CategoriaComponent
 * @implements {OnInit, AfterViewInit}
 */

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, AfterViewInit {
  recetas: any[] = [];
  recetaSeleccionada: any = null;
  tipo: string = '';
  private modalInstance: Modal | null = null;

  @ViewChild('modalReceta') modalReceta!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private favoritosService: FavoritosService,
    private router: Router,
    private recetasService: RecetasService
  ) { }

  
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo') || '';
      const recetasCrudas = this.recetasService.getRecetasPorCategoria()[this.tipo] || [];
      
      // Agrega propiedad `esFavorita` para cada receta
      this.recetas = recetasCrudas.map((receta: any) => ({
        ...receta,
        esFavorita: this.favoritosService.esFavorito(receta.nombre)
      }));
    });
  }

  // Se llama desde el hijo
  manejarFavorito(recetaNombre: string): void {
    const resultado = this.favoritosService.alternarFavorito(recetaNombre);

    if (resultado === 'login') {
      alert('Debes iniciar sesión como usuario normal para agregar recetas a favoritos.');
      this.router.navigate(['/login']);
      return;
    }

    // Actualiza visualmente el icono de favorito
    const receta = this.recetas.find(r => r.nombre === recetaNombre);
    if (receta) {
      receta.esFavorita = !receta.esFavorita;
    }

    alert(resultado);
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalReceta.nativeElement);
  }

  abrirModal(receta: any): void {
    this.recetaSeleccionada = receta;
    this.modalInstance?.show();
  }
}