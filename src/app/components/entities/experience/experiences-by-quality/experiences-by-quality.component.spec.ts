import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesByQualityComponent } from './experiences-by-quality.component';

describe('ExperiencesByQualityComponent', () => {
  let component: ExperiencesByQualityComponent;
  let fixture: ComponentFixture<ExperiencesByQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesByQualityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencesByQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
