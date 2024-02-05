import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceArticleComponent } from './experience-article.component';

describe('ExperienceArticleComponent', () => {
  let component: ExperienceArticleComponent;
  let fixture: ComponentFixture<ExperienceArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
