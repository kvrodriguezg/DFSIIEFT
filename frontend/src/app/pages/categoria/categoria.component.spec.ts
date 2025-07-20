import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaComponent } from './categoria.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { RecetasService } from 'src/app/services/recetas.service';

//Simula el servicio de favoritos con dos métodos falsos
const mockFavoritosService = {
  esFavorito: (nombre: string) => false,             //Siempre devuelve false
  alternarFavorito: (nombre: string) => 'Agregado'   //Siempre devuelve 'Agregado'
};

//Simula el servicio de recetas que devuelve una receta en la categoría "postres"
const mockRecetasService = {
  getRecetasPorCategoria: () => ({
    postres: [
      { nombre: 'Tarta', ingredientes: ['harina'], instrucciones: ['mezclar'] }
    ]
  })
};

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;                     //Componente a probar
  let fixture: ComponentFixture<CategoriaComponent>;     //Fixture que permite acceder al DOM y al componente

  //beforeEach se ejecuta antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaComponent],                //Declara el componente que se está probando
      schemas: [NO_ERRORS_SCHEMA],                       //Ignora errores de elementos desconocidos en la plantilla
      providers: [                                       //Proveedores simulados
        {
          //Simula la ruta con el parámetro 'tipo' que siempre devolverá 'postres'
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
    }).compileComponents(); //Compila el módulo de pruebas

    //Crea una instancia del componente
    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //Detecta los cambios iniciales en el componente
  });

  //Verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Verifica que al inicializar el componente se cargan las recetas y se marcan como favoritas si corresponde
  it('debe cargar recetas y asignar esFavorita en ngOnInit', () => {
    const favoritosService = TestBed.inject(FavoritosService);
    spyOn(favoritosService, 'esFavorito').and.returnValue(true); //Fuerza a que siempre devuelva true

    component.ngOnInit(); //Llama al método de inicialización

    expect(component.recetas.length).toBe(1); //Se espera una receta
    expect(component.recetas[0].nombre).toBe('Tarta');
    expect(component.recetas[0].esFavorita).toBeTrue(); //Se espera que esté marcada como favorita
  });

  //Verifica que se pueda alternar una receta como favorita y que se muestre una alerta
  it('debe alternar favorito y actualizar estado visual', () => {
    //Simula que la receta ya está en el componente
    component.recetas = [{ nombre: 'Tarta', esFavorita: false }];
    const favoritosService = TestBed.inject(FavoritosService);
    spyOn(favoritosService, 'alternarFavorito').and.returnValue('Agregado'); //Devuelve un mensaje simulado

    spyOn(window, 'alert'); //Espía la función alert para verificar si se llama

    component.manejarFavorito('Tarta'); //Llama al método que alterna favorito

    expect(component.recetas[0].esFavorita).toBeTrue(); //Se espera que ahora sea favorita
    expect(window.alert).toHaveBeenCalledWith('Agregado'); //Se espera que se haya mostrado el mensaje
  });

  //Verifica que se pueda abrir un modal con los datos de la receta seleccionada
  it('debe asignar recetaSeleccionada y mostrar modal', () => {
    const recetaMock = { nombre: 'Tarta', descripcion: 'Deliciosa' };
    const showSpy = jasmine.createSpy('show');
    (component as any).modalInstance = { show: showSpy }; //Simula el modal

    component.abrirModal(recetaMock); //Abre el modal con la receta

    expect(component.recetaSeleccionada).toEqual(recetaMock); //Se espera que se haya asignado la receta
    expect(showSpy).toHaveBeenCalled(); //Se espera que se haya mostrado el modal
  });
});