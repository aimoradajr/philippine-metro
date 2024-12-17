import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapViewerComponent } from './map-viewer';

describe('MapViewerComponent', () => {
  let component: MapViewerComponent;
  let fixture: ComponentFixture<MapViewerComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
