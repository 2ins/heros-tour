import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMasterItemComponent } from './location-master-item.component';

describe('LocationMasterItemComponent', () => {
  let component: LocationMasterItemComponent;
  let fixture: ComponentFixture<LocationMasterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationMasterItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMasterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
