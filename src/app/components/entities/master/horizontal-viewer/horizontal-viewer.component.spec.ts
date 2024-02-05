import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalViewerComponent } from './horizontal-viewer.component';

describe('HorizontalViewerComponent', () => {
  let component: HorizontalViewerComponent;
  let fixture: ComponentFixture<HorizontalViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
