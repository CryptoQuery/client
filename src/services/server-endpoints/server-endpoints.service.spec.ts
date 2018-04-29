import { TestBed, inject } from '@angular/core/testing';

import { ServerEndpointsService } from './server-endpoints.service';

describe('ServerEndpointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerEndpointsService]
    });
  });

  it('should be created', inject([ServerEndpointsService], (service: ServerEndpointsService) => {
    expect(service).toBeTruthy();
  }));
});
