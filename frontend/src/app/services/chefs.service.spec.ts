import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChefsService } from './chefs.service';

describe('ChefsService', () => {
  let service: ChefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Necesario para probar servicios con HttpClient
      providers: [ChefsService]
    });
    service = TestBed.inject(ChefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});