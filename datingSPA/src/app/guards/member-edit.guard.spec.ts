import { TestBed } from '@angular/core/testing';

import { MemberEditGuard } from './member-edit.guard';

describe('MemberEditGuard', () => {
  let guard: MemberEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MemberEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
