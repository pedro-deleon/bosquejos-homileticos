import { TestBed } from '@angular/core/testing';

import { BosquejoResolver } from './bosquejo.resolver';

describe('BosquejoResolver', () => {
  let resolver: BosquejoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BosquejoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
