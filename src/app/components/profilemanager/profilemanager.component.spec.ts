import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemanagerComponent } from './profilemanager.component';

describe('ProfilemanagerComponent', () => {
  let component: ProfilemanagerComponent;
  let fixture: ComponentFixture<ProfilemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilemanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
