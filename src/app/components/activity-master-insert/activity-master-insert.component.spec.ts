import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMasterInsertComponent } from './activity-master-insert.component';

describe('ActivityMasterInsertComponent', () => {
  let component: ActivityMasterInsertComponent;
  let fixture: ComponentFixture<ActivityMasterInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityMasterInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityMasterInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
