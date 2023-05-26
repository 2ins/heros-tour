import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceInsertComponent } from './experience-insert.component';

describe('ExperienceInsertComponent', () => {
  let component: ExperienceInsertComponent;
  let fixture: ComponentFixture<ExperienceInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
