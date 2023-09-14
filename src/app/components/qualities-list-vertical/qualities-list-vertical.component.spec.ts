import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitiesListVerticalComponent } from './qualities-list-vertical.component';

describe('QualitiesListVerticalComponent', () => {
  let component: QualitiesListVerticalComponent;
  let fixture: ComponentFixture<QualitiesListVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitiesListVerticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitiesListVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
