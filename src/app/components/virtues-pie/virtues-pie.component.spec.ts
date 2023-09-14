import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtuesPieComponent } from './virtues-pie.component';

describe('VirtuesPieComponent', () => {
  let component: VirtuesPieComponent;
  let fixture: ComponentFixture<VirtuesPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtuesPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtuesPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
