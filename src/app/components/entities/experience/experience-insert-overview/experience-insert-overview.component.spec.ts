import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceInsertOverviewComponent } from './experience-insert-overview.component';

describe('ExperienceInsertOverviewComponent', () => {
  let component: ExperienceInsertOverviewComponent;
  let fixture: ComponentFixture<ExperienceInsertOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceInsertOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceInsertOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
