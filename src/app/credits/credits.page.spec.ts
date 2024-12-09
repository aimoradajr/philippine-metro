import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditsPage } from './credits.page';

describe('CreditsPage', () => {
  let component: CreditsPage;
  let fixture: ComponentFixture<CreditsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
