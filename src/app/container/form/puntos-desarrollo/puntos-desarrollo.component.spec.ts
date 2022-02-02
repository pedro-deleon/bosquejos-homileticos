import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosDesarrolloComponent } from './puntos-desarrollo.component';

describe('PuntosDesarrolloComponent', () => {
  let component: PuntosDesarrolloComponent;
  let fixture: ComponentFixture<PuntosDesarrolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosDesarrolloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosDesarrolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
