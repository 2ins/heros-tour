import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitiesListHorizontalComponent } from './qualities-list-horizontal.component';

describe('QualitiesListHorizontalComponent', () => {
  let component: QualitiesListHorizontalComponent;
  let fixture: ComponentFixture<QualitiesListHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitiesListHorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitiesListHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
