import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeQualitiesComponent } from './free-qualities.component';

describe('FreeQualitiesComponent', () => {
  let component: FreeQualitiesComponent;
  let fixture: ComponentFixture<FreeQualitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeQualitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeQualitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
