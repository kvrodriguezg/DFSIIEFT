import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
/**
 * Componente para el registro de nuevos usuarios.
 * Incluye validaciones personalizadas para el RUT, la edad mínima y la coincidencia de contraseñas.
 *
 * @export
 * @class RegisterComponent
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', [Validators.required, this.validarRut]],
      fechaNacimiento: ['', [Validators.required, this.validarEdad]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { noCoincide: true };
  }

  validarEdad(control: AbstractControl) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const cumple = (
      edad > 13 ||
      (edad === 13 && hoy >= new Date(fecha.setFullYear(fecha.getFullYear() + 13)))
    );
    return cumple ? null : { edadInvalida: true };
  }

  validarRut(control: AbstractControl) {
    const rut = (control.value || '').toUpperCase().replace(/\./g, '').replace(/-/g, '');
    if (rut.length < 8) return { rutInvalido: true };

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    if (!/^\d+$/.test(cuerpo)) return { rutInvalido: true };

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resultado = 11 - (suma % 11);
    let dvEsperado = resultado === 11 ? '0' : resultado === 10 ? 'K' : resultado.toString();

    return dv !== dvEsperado ? { rutInvalido: true } : null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const nuevoUsuario = {
      nombre: this.f['nombre'].value,
      rut: this.f['rut'].value,
      fechaNacimiento: this.f['fechaNacimiento'].value,
      email: this.f['email'].value,
      telefono: this.f['telefono'].value,
      password: this.f['password'].value,
      tipo: 'normal'
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some((u: any) => u.email === nuevoUsuario.email)) {
      alert('Ya existe una cuenta con ese correo.');
      return;
    }
    if (usuarios.some((u: any) => u.rut === nuevoUsuario.rut)) {
      alert('Ya existe una cuenta con ese RUT.');
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('¡Usuario registrado con éxito!');
    this.router.navigate(['/login']);
  }
}