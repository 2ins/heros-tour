import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLocationsMapComponent } from './multiple-locations-map.component';

describe('MultipleLocationsMapComponent', () => {
  let component: MultipleLocationsMapComponent;
  let fixture: ComponentFixture<MultipleLocationsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleLocationsMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleLocationsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
