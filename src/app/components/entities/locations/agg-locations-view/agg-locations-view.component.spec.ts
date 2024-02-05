import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggLocationsViewComponent } from './agg-locations-view.component';

describe('AggLocationsViewComponent', () => {
  let component: AggLocationsViewComponent;
  let fixture: ComponentFixture<AggLocationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggLocationsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggLocationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
