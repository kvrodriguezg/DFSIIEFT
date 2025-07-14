import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Chef {
  id: number;
  nombre: string;
  pais: string;
  especialidad: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChefsService {
  private apiUrl = 'https://kvrodriguezg.github.io/json-api-chefs/chefs.json';
  private chefsLocal: Chef[] = [];
  private cargado: boolean = false;

  constructor(private http: HttpClient) {}

  //Traer los chefs desde GitHub solo una vez y luego trabajar local
  getChefs(): Observable<Chef[]> {
    if (!this.cargado) {
      return new Observable(observer => {
        this.http.get<Chef[]>(this.apiUrl).subscribe(data => {
          this.chefsLocal = data;
          this.cargado = true;
          observer.next(this.chefsLocal);
          observer.complete();
        });
      });
    } else {
      return of(this.chefsLocal);
    }
  }

  //Agregar chef
  agregarChef(chef: Chef): Observable<Chef> {
    const nuevo = { ...chef, id: Date.now() };
    this.chefsLocal.push(nuevo);
    return of(nuevo);
  }

  //Actualizar chef
  actualizarChef(chefActualizado: Chef): Observable<Chef> {
    const index = this.chefsLocal.findIndex(c => c.id === chefActualizado.id);
    if (index !== -1) {
      this.chefsLocal[index] = { ...chefActualizado };
    }
    return of(chefActualizado);
  }

  //Eliminar chef
  eliminarChef(id: number): Observable<boolean> {
    this.chefsLocal = this.chefsLocal.filter(c => c.id !== id);
    return of(true);
  }
}