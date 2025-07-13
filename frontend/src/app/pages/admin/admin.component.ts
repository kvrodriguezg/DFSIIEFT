import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente que administra la gestión de usuarios en la aplicación.
 * Permite listar, editar y eliminar usuarios almacenados en localStorage.
 * Solo es accesible para usuarios con sesión de tipo 'admin'.
 *
 * @export
 * @class AdminComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  sesion: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('sesion') || 'null');
    if (!this.sesion || this.sesion.tipo !== 'admin') {
      alert('Acceso denegado. Solo para administradores.');
      this.router.navigate(['/']);
      return;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  editarUsuario(index: number): void {
    const usuario = this.usuarios[index];
    const nuevoNombre = prompt('Nuevo nombre:', usuario.nombre)?.trim();
    const nuevoCorreo = prompt('Nuevo correo:', usuario.email)?.trim();
    const nuevoTelefono = prompt('Nuevo teléfono:', usuario.telefono)?.trim();

    if (!nuevoNombre) {
      alert('Nombre no puede ser vacío');
      return;
    }

    if (!nuevoCorreo || !this.validarEmail(nuevoCorreo)) {
      alert('Correo no válido');
      return;
    }

    const telefonoRegex = /^[0-9]{9}$/;
    if (!nuevoTelefono || !telefonoRegex.test(nuevoTelefono)) {
      alert('El teléfono debe contener exactamente 9 dígitos.');
      return;
    }

    // Actualiza correo de sesión si corresponde
    if (usuario.email === this.sesion.email) {
      this.sesion.email = nuevoCorreo;
      localStorage.setItem('sesion', JSON.stringify(this.sesion));
    }

    // Actualiza usuario
    this.usuarios[index].nombre = nuevoNombre;
    this.usuarios[index].email = nuevoCorreo;
    this.usuarios[index].telefono = nuevoTelefono;

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    alert('Usuario actualizado ✅');
    this.cargarUsuarios();
  }

  eliminarUsuario(index: number): void {
    const usuario = this.usuarios[index];

    if (usuario.email === this.sesion.email) {
      alert('No puedes eliminar tu propio usuario.');
      return;
    }

    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarios.splice(index, 1);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      alert('Usuario eliminado ❌');
      this.cargarUsuarios();
    }
  }

  validarEmail(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.trim())) {
      alert('Formato de Email no válido');
      return false;
    }
    return true;
  }
}
