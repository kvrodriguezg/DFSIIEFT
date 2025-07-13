import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * Componente para mostrar una tarjeta de receta individual.
 * Muestra información básica de la receta y permite acciones como ver detalles o marcar como favorita.
 *
 * @export
 * @class RecetaCardComponent
 */
@Component({
  selector: 'app-receta-card',
  templateUrl: './receta-card.component.html',
  styleUrls: ['./receta-card.component.css']
})
export class RecetaCardComponent {
  @Input() receta: any;
  @Input() mostrarFavorito: boolean = true;
  @Output() verDetalle = new EventEmitter<void>();
  @Output() toggleFavoritoClick = new EventEmitter<string>(); // ← Nuevo evento

  toggleFavorito(nombre: string) {
    this.toggleFavoritoClick.emit(nombre); // ← Emitimos el nombre de la receta
  }
}