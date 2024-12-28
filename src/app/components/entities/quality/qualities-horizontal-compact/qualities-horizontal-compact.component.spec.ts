import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitiesHorizontalCompactComponent } from './qualities-horizontal-compact.component';

describe('QualitiesHorizontalCompactComponent', () => {
  let component: QualitiesHorizontalCompactComponent;
  let fixture: ComponentFixture<QualitiesHorizontalCompactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitiesHorizontalCompactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitiesHorizontalCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
