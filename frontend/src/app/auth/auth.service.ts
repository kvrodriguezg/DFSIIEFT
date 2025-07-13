import { Injectable } from '@angular/core';
import { Usuario } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: Usuario[] = [];

  constructor() {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
    this.crearAdminPorDefecto();
  }

  private crearAdminPorDefecto() {
    const existe = this.usuarios.some(u => u.email === 'admin@mesadigital.com');
    if (!existe) {
      const admin: Usuario = {
        nombre: 'Administrador',
        rut: '11111111-1',
        email: 'admin@mesadigital.com',
        telefono: '999999999',
        password: 'Admin123*',
        fechaNacimiento: '1990-10-01',
        tipo: 'admin'
      };
      this.usuarios.push(admin);
      this.guardarUsuarios();
      console.log('Usuario admin creado por defecto.');
    }
  }

  private guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  login(email: string, password: string): boolean {
    const usuario = this.usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      localStorage.setItem('sesion', JSON.stringify({
        logueado: true,
        email: usuario.email,
        tipo: usuario.tipo
      }));
      return true;
    }
    return false;
  }
}
