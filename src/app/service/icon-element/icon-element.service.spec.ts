import { TestBed } from '@angular/core/testing';

import { IconElementService } from './icon-element.service';

describe('IconElementService', () => {
  let service: IconElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
