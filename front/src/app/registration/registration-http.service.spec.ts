import { TestBed, inject } from '@angular/core/testing';

import { RegistrationHttpService } from './registration-http.service';

describe('RegistrationHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationHttpService]
    });
  });

  it('should be created', inject([RegistrationHttpService], (service: RegistrationHttpService) => {
    expect(service).toBeTruthy();
  }));
});
