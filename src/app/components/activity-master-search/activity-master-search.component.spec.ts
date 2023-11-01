import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMasterSearchComponent } from './activity-master-search.component';

describe('ActivityMasterSearchComponent', () => {
  let component: ActivityMasterSearchComponent;
  let fixture: ComponentFixture<ActivityMasterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityMasterSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityMasterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
