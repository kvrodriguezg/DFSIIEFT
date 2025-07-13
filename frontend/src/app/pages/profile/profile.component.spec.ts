import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
/**
 * Pruebas unitarias para el componente {@link ProfileComponent}.
 * 
 * Verifica la correcta inicialización del formulario, comportamiento de validación
 * y persistencia de datos en el almacenamiento local.
 */
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  //Datos simulados en localStorage
  const sesionMock = { email: 'test@ejemplo.com' };
  const usuariosMock = [
    {
      email: 'test@ejemplo.com',
      nombre: 'Test Usuario',
      rut: '12345678-9',
      telefono: '123456789',
      fechaNacimiento: '2000-01-01'
    }
  ];

  beforeEach(async () => {
    //Configurar el TestBed
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProfileComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    //Simular localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'sesion') return JSON.stringify(sesionMock);
      if (key === 'usuarios') return JSON.stringify(usuariosMock);
      return null;
    });

    spyOn(localStorage, 'setItem').and.callFake(() => { });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //detecta cambios y ejecuta ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with logged user data', () => {
    const form = component.perfilForm;
    expect(form.get('nombre')?.value).toBe('Test Usuario');
    expect(form.get('email')?.value).toBe('test@ejemplo.com');
    expect(form.get('telefono')?.value).toBe('123456789');
    expect(form.get('fechaNacimiento')?.value).toBe('2000-01-01');
  });

  it('should mark form as invalid if nombre is empty', () => {
    component.perfilForm.get('nombre')?.setValue('');
    expect(component.perfilForm.invalid).toBeTrue();
  });

  it('should save changes and update localStorage', () => {
    //Preparar el spy para alert
    spyOn(window, 'alert');

    //Cambiar algún dato válido
    component.perfilForm.get('nombre')?.setValue('Nuevo Nombre');

    //Ejecutar guardarCambios
    component.guardarCambios();

    //Verificar que localStorage.setItem fue llamado para usuarios y sesion
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'usuarios',
      jasmine.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'sesion',
      jasmine.any(String)
    );

    expect(window.alert).toHaveBeenCalledWith('Datos actualizados correctamente.');
  });
  it('should not save changes if the form is invalid', () => {
    //Espiar alert
    spyOn(window, 'alert');

    //Dejar el formulario en estado inválido
    component.perfilForm.get('nombre')?.setValue('');

    //Ejecutar guardarCambios
    component.guardarCambios();

    //Verificar que NO se llama a setItem ni alert
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });
});
