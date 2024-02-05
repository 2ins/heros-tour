import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceMasterUserPicComponent } from './experience-master-user-pic.component';

describe('ExperienceMasterUserPicComponent', () => {
  let component: ExperienceMasterUserPicComponent;
  let fixture: ComponentFixture<ExperienceMasterUserPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceMasterUserPicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceMasterUserPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
