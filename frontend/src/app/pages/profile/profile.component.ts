import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
/**
 * Componente que representa el perfil del usuario,
 * permite visualizar y actualizar sus datos personales.
 *
 * @export
 * @class ProfileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  perfilForm!: FormGroup;
  sesion: any;
  usuarios: any[] = [];
  rut: string = '';

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    const sesionStorage = localStorage.getItem('sesion');
    const usuariosStorage = localStorage.getItem('usuarios');

    if (!sesionStorage) {
      this.router.navigate(['/']);
      return;
    }

    this.sesion = JSON.parse(sesionStorage);
    this.usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];

    const usuario = this.usuarios.find(u => u.email === this.sesion.email);
    if (!usuario) return;

    this.rut = usuario.rut || '';

    this.perfilForm = this.fb.group({
      nombre: [usuario.nombre || '', Validators.required],
      email: [
        usuario.email || '',
        [
          Validators.required,
          Validators.email,
          this.emailPersonalizadoValidator()
        ]
      ],
      telefono: [usuario.telefono || '', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      fechaNacimiento: [usuario.fechaNacimiento || '', [Validators.required, this.validarEdadMinima(13)]]
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.perfilForm.get(campo);
    return !!control && control.invalid && control.touched;
  }

  guardarCambios(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const formData = this.perfilForm.value;
    const index = this.usuarios.findIndex(u => u.email === this.sesion.email);
    if (index !== -1) {
      this.usuarios[index] = {
        ...this.usuarios[index],
        ...formData
      };

      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      this.sesion.email = formData.email;
      localStorage.setItem('sesion', JSON.stringify(this.sesion));

      alert('Datos actualizados correctamente.');
    }
  }

  validarEdadMinima(minEdad: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fecha = new Date(control.value);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fecha.getFullYear();
      const mes = hoy.getMonth() - fecha.getMonth();
      const dia = hoy.getDate() - fecha.getDate();

      const esMayor =
        edad > minEdad ||
        (edad === minEdad && (mes > 0 || (mes === 0 && dia >= 0)));

      return esMayor ? null : { menorEdad: true };
    };
  }

  emailPersonalizadoValidator(): ValidatorFn {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío, ya lo hace Validators.required

      const valido = regexEmail.test(control.value.trim());
      return valido ? null : { emailInvalido: true };
    };
  }
}