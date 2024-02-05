import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitiesListVerticalBigComponent } from './qualities-list-vertical-big.component';

describe('QualitiesListVerticalBigComponent', () => {
  let component: QualitiesListVerticalBigComponent;
  let fixture: ComponentFixture<QualitiesListVerticalBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitiesListVerticalBigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitiesListVerticalBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
