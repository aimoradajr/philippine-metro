import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lrt1Page } from './lrt1.page';

describe('Lrt1Page', () => {
  let component: Lrt1Page;
  let fixture: ComponentFixture<Lrt1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Lrt1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
