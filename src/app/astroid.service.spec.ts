import { TestBed, inject } from '@angular/core/testing';

import { AstroidService } from './astroid.service';

describe('AstroidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AstroidService]
    });
  });

  it('should be created', inject([AstroidService], (service: AstroidService) => {
    expect(service).toBeTruthy();
  }));
});
