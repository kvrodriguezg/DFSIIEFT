import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefsService {
  private apiUrl = 'https://kvrodriguezg.github.io/json-api-chefs/chefs.json';
  private chefsLocal: any[] = [];
  private cargado: boolean = false; // Para evitar múltiples cargas

  constructor(private http: HttpClient) {}

  // Cargar desde GitHub UNA sola vez y luego trabajar en local
  getChefs(): Observable<any[]> {
    if (!this.cargado) {
      return new Observable((observer) => {
        this.http.get<any[]>(this.apiUrl).subscribe(data => {
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

  agregarChef(chef: any): Observable<any> {
    chef.id = Date.now();
    this.chefsLocal.push(chef);
    return of(chef);
  }

  actualizarChef(id: number, datosActualizados: any): Observable<any> {
    const index = this.chefsLocal.findIndex(c => c.id === id);
    if (index !== -1) {
      this.chefsLocal[index] = { ...this.chefsLocal[index], ...datosActualizados };
      return of(this.chefsLocal[index]);
    }
    return of(null);
  }

  eliminarChef(id: number): Observable<any> {
    this.chefsLocal = this.chefsLocal.filter(c => c.id !== id);
    return of({ eliminado: true });
  }
}