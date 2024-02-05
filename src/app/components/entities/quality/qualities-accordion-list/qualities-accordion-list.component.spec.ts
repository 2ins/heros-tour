import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitiesAccordionListComponent } from './qualities-accordion-list.component';

describe('QualitiesAccordionListComponent', () => {
  let component: QualitiesAccordionListComponent;
  let fixture: ComponentFixture<QualitiesAccordionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitiesAccordionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitiesAccordionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
