import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChefsComponent } from './chefs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChefsComponent', () => {
  // Declaramos las variables del componente y su fixture (entorno de prueba)
  let component: ChefsComponent;
  let fixture: ComponentFixture<ChefsComponent>;

  // Configuración inicial del entorno de pruebas, se ejecuta una vez antes de todos los tests
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se declara el componente que se va a probar
      declarations: [ChefsComponent],

      // Se importan módulos que el componente necesita para funcionar correctamente
      imports: [ HttpClientTestingModule, FormsModule ],

      // Opcional: evita errores si el template del componente contiene componentes no declarados
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents(); // Compila los componentes declarados
  });

  // Se ejecuta antes de cada prueba individual
  beforeEach(() => {
    // Crea una instancia del componente dentro del entorno de pruebas
    fixture = TestBed.createComponent(ChefsComponent);
    
    // Obtiene una instancia del componente que podemos usar para hacer pruebas
    component = fixture.componentInstance;

    // Detecta los cambios iniciales del componente (simula el ciclo de vida de Angular)
    fixture.detectChanges();
  });

  // Prueba que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // La expectativa es que el componente exista (sea "truthy")
  });
});
