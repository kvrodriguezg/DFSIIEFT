import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChefsComponent } from './chefs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChefsComponent', () => {
  let component: ChefsComponent;
  let fixture: ComponentFixture<ChefsComponent>;

  //Configuración inicial
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //Se declara el componente
      declarations: [ChefsComponent],

      //Se importan módulos que el componente necesita para funcionar correctamente
      imports: [ HttpClientTestingModule, FormsModule ],

      //Evita errores si el template del componente contiene componentes no declarados
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  //Se ejecuta antes de cada prueba individual
  beforeEach(() => {
    //Instancia del componente
    fixture = TestBed.createComponent(ChefsComponent);
    
    //Obtiene una instancia del componente
    component = fixture.componentInstance;

    //Detecta los cambios iniciales del componente
    fixture.detectChanges();
  });

  //Prueba que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
