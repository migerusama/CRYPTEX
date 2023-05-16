import { TestBed } from '@angular/core/testing';

import { AuthGuardNotLoggedInService } from './auth-guard-not-logged-in.service';

describe('AuthGuardNotLoggedInService', () => {
  let service: AuthGuardNotLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardNotLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
