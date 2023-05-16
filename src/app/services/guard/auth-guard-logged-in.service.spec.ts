import { TestBed } from '@angular/core/testing';

import { AuthGuardLoggedInService } from './auth-guard-logged-in.service';

describe('AuthGuardService', () => {
  let service: AuthGuardLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
