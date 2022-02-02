import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BosquejoComponent } from './bosquejo.component';

describe('BosquejoComponent', () => {
  let component: BosquejoComponent;
  let fixture: ComponentFixture<BosquejoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BosquejoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BosquejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
