import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaComponent } from './categoria.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { RecetasService } from 'src/app/services/recetas.service';

// Servicios simulados
const mockFavoritosService = {
  esFavorito: (nombre: string) => false,
  alternarFavorito: (nombre: string) => 'Agregado'
};

const mockRecetasService = {
  getRecetasPorCategoria: () => ({
    postres: [
      { nombre: 'Tarta', ingredientes: ['harina'], instrucciones: ['mezclar'] }
    ]
  })
};

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => (key === 'tipo' ? 'postres' : null)
            }),
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'tipo' ? 'postres' : null)
              }
            }
          }
        },
        { provide: FavoritosService, useValue: mockFavoritosService },
        { provide: RecetasService, useValue: mockRecetasService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar recetas y asignar esFavorita en ngOnInit', () => {
    const favoritosService = TestBed.inject(FavoritosService);
    spyOn(favoritosService, 'esFavorito').and.returnValue(true);

    component.ngOnInit();

    expect(component.recetas.length).toBe(1);
    expect(component.recetas[0].nombre).toBe('Tarta');
    expect(component.recetas[0].esFavorita).toBeTrue();
  });

  it('debe alternar favorito y actualizar estado visual', () => {
    component.recetas = [{ nombre: 'Tarta', esFavorita: false }];
    const favoritosService = TestBed.inject(FavoritosService);
    spyOn(favoritosService, 'alternarFavorito').and.returnValue('Agregado');

    spyOn(window, 'alert');

    component.manejarFavorito('Tarta');

    expect(component.recetas[0].esFavorita).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith('Agregado');
  });

  it('debe asignar recetaSeleccionada y mostrar modal', () => {
    const recetaMock = { nombre: 'Tarta', descripcion: 'Deliciosa' };
    const showSpy = jasmine.createSpy('show');
    (component as any).modalInstance = { show: showSpy };

    component.abrirModal(recetaMock);

    expect(component.recetaSeleccionada).toEqual(recetaMock);
    expect(showSpy).toHaveBeenCalled();
  });
});