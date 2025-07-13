import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
/**
 * Componente para restablecer la contraseña de un usuario.
 * Permite al usuario ingresar su correo y establecer una nueva contraseña.
 *
 * @export
 * @class ResetPasswordComponent
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordsIguales
      }
    );
  }

  // Getters para fácil acceso
  get email(): AbstractControl {
    return this.resetForm.get('email')!;
  }

  get newPassword(): AbstractControl {
    return this.resetForm.get('newPassword')!;
  }

  get confirmPassword(): AbstractControl {
    return this.resetForm.get('confirmPassword')!;
  }

  get confirmPasswordInvalid(): boolean {
    return (
      this.confirmPassword.invalid ||
      (this.submitted && this.resetForm.hasError('noCoincide'))
    );
  }

  passwordsIguales(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { noCoincide: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }

    const email = this.email.value;
    const nueva = this.newPassword.value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.email === email);

    if (index === -1) {
      alert('No se encontró un usuario con ese correo.');
      return;
    }

    usuarios[index].password = nueva;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Contraseña actualizada exitosamente');
    this.router.navigate(['/login']);
  }
}