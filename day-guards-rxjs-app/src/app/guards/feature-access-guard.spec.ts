import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { featureAccessGuard } from './feature-access-guard';

describe('featureAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => featureAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
