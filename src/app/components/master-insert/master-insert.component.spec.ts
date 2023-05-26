import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterInsertComponent } from './master-insert.component';

describe('MasterInsertComponent', () => {
  let component: MasterInsertComponent;
  let fixture: ComponentFixture<MasterInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
