import { Injectable } from '@angular/core';
/**
 * Servicio que permite gestionar recetas favoritas de los usuarios.
 * Incluye funcionalidades para obtener, verificar y alternar favoritos usando `localStorage`.
 *
 * @export
 * @class FavoritosService
 */
@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private readonly STORAGE_KEY = 'favoritos';

  constructor() {}

  obtenerSesion(): any {
    return JSON.parse(localStorage.getItem('sesion') || 'null');
  }

  obtenerFavoritos(): any[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  guardarFavoritos(favoritos: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
  }

  esFavorito(receta: string): boolean {
    const sesion = this.obtenerSesion();
    const favoritos = this.obtenerFavoritos();
    return favoritos.some(item => item.email === sesion?.email && item.receta === receta);
  }

  alternarFavorito(receta: string): string {
    const sesion = this.obtenerSesion();

    if (!sesion || sesion.tipo !== 'normal') {
      localStorage.setItem('redirigirDespues', location.pathname);
      return 'login';
    }

    const favoritos = this.obtenerFavoritos();
    const index = favoritos.findIndex(item => item.email === sesion.email && item.receta === receta);

    let mensaje = '';
    if (index !== -1) {
      favoritos.splice(index, 1);
      mensaje = `"${receta}" fue eliminada de tus favoritos.`;
    } else {
      favoritos.push({ receta, email: sesion.email });
      mensaje = `"${receta}" fue agregada a tus favoritos.`;
    }

    this.guardarFavoritos(favoritos);
    return mensaje;
  }
}