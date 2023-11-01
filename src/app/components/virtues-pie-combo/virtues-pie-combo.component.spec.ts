import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtuesPieComboComponent } from './virtues-pie-combo.component';

describe('VirtuesPieComboComponent', () => {
  let component: VirtuesPieComboComponent;
  let fixture: ComponentFixture<VirtuesPieComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtuesPieComboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtuesPieComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
