import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitiesListGridComponent } from './qualities-list-grid.component';

describe('QualitiesListGridComponent', () => {
  let component: QualitiesListGridComponent;
  let fixture: ComponentFixture<QualitiesListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitiesListGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitiesListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
