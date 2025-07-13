import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Servicio de autenticación de usuarios.
 * Gestiona el inicio y cierre de sesión, y la creación automática del usuario administrador.
 *
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {
    this.initializeAdminUser();
  }

  // Crear usuario admin si no existe
  private initializeAdminUser() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existeAdmin = usuarios.some((user: any) => user.email === 'admin@mesadigital.com');

    if (!existeAdmin) {
      const admin = {
        nombre: "Administrador",
        rut: "11111111-1",
        email: "admin@mesadigital.com",
        telefono: "999999999",
        password: "Admin123*",
        fechaNacimiento: "1990-10-01",
        tipo: "admin"
      };
      usuarios.push(admin);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log("Usuario admin creado por defecto.");
    }
  }

  // Función para iniciar sesión
  login(email: string, password: string): boolean {
    if (!this.validarEmail(email) || !this.validarPassword(password)) {
      return false;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email && u.password === password);

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

  // Validaciones
  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private validarPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/;
    return regex.test(password);
  }

  // Obtener usuario actual
  getCurrentUser() {
    const session = localStorage.getItem('sesion');
    return session ? JSON.parse(session) : null;
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
}