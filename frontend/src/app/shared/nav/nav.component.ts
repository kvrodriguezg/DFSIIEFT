import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Componente de navegación principal de la aplicación.
 * Muestra enlaces condicionales según el tipo de usuario logueado (admin o normal),
 * y permite cerrar la sesión del usuario actual.
 *
 * @export
 * @class NavComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  sesion: any = null;
  esAdmin: boolean = false;
  esNormal: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;
    this.esAdmin = this.sesion?.logueado && this.sesion.tipo === 'admin';
    this.esNormal = this.sesion?.logueado && this.sesion.tipo === 'normal';
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.sesion = null;
    this.esAdmin = false;
    this.esNormal = false;
    this.router.navigate(['/']);
  }
}