import { TestBed } from '@angular/core/testing';

import { AngularMaterialSchedulerService } from './angular-material-scheduler.service';

describe('AngularMaterialSchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularMaterialSchedulerService = TestBed.get(AngularMaterialSchedulerService);
    expect(service).toBeTruthy();
  });
});
