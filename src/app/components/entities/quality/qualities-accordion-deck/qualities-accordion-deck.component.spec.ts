import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitiesAccordionDeckComponent } from './qualities-accordion-deck.component';

describe('QualitiesAccordionDeckComponent', () => {
  let component: QualitiesAccordionDeckComponent;
  let fixture: ComponentFixture<QualitiesAccordionDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitiesAccordionDeckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitiesAccordionDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
