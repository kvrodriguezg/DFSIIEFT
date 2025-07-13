export interface Usuario {
  nombre: string;
  rut: string;
  email: string;
  telefono: string;
  password: string;
  fechaNacimiento: string;
  tipo: 'admin' | 'normal';
}