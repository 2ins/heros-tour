import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePicComponent } from './experience-pic.component';

describe('ExperiencePicComponent', () => {
  let component: ExperiencePicComponent;
  let fixture: ComponentFixture<ExperiencePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencePicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
