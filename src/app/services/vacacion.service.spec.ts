import { TestBed } from '@angular/core/testing';

import { VacacionService } from './vacacion.service';

describe('VacacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacacionService = TestBed.get(VacacionService);
    expect(service).toBeTruthy();
  });
});
