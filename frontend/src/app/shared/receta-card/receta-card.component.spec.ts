import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaCardComponent } from './receta-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RecetaCardComponent', () => {
  let component: RecetaCardComponent;
  let fixture: ComponentFixture<RecetaCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecetaCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(RecetaCardComponent);
    component = fixture.componentInstance;
    component.receta = {
      imagen: 'ruta/falsa.jpg',
      titulo: 'Ejemplo',
      descripcion: 'Ejemplo de receta'
      
    };
    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
