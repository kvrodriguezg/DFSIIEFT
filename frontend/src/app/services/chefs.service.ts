import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefsService {

  private apiUrl = 'https://kvrodriguezg.github.io/json-api-chefs/chefs.json';

  constructor(private http: HttpClient) {}
  //Se consume API 
  getChefs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}