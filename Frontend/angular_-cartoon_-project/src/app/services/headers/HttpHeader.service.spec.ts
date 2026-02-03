/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpHeaderService } from './HttpHeader.service';

describe('Service: HttpHeader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHeaderService]
    });
  });

  it('should ...', inject([HttpHeaderService], (service: HttpHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
