import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesAccordionListComponent } from './activities-accordion-list.component';

describe('ActivitiesAccordionListComponent', () => {
  let component: ActivitiesAccordionListComponent;
  let fixture: ComponentFixture<ActivitiesAccordionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesAccordionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesAccordionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
