import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineViewerPage } from './line-viewer.page';

describe('LineViewerPage', () => {
  let component: LineViewerPage;
  let fixture: ComponentFixture<LineViewerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LineViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
