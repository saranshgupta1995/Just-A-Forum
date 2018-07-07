import { TestBed, inject } from '@angular/core/testing';

import { SessionConstsService } from './session-consts.service';

describe('SessionConstsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionConstsService]
    });
  });

  it('should be created', inject([SessionConstsService], (service: SessionConstsService) => {
    expect(service).toBeTruthy();
  }));
});
