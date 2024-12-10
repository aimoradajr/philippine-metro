import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathFinderPage } from './pathfinder.page';

describe('PathFinderPage', () => {
  let component: PathFinderPage;
  let fixture: ComponentFixture<PathFinderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PathFinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
