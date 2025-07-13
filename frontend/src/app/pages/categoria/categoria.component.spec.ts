import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaComponent } from './categoria.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // simula route.paramMap como observable
            paramMap: of({
              get: (key: string) => {
                if (key === 'tipo') return 'postres';
                return null;
              }
            }),

            // si además usas snapshot.paramMap en el componente
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'tipo') return 'postres';
                  return null;
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});