import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarePage } from './fare.page';

describe('FarePage', () => {
  let component: FarePage;
  let fixture: ComponentFixture<FarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
