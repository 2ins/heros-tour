import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtuesComponent } from './virtues.component';

describe('VirtuesComponent', () => {
  let component: VirtuesComponent;
  let fixture: ComponentFixture<VirtuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
