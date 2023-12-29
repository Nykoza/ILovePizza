import { TestBed } from '@angular/core/testing';

import { RequestClientService } from './request-client.service';

describe('RequestClientService', () => {
  let service: RequestClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
