import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatInfoComponent } from './contat-info.component';

describe('ContatInfoComponent', () => {
  let component: ContatInfoComponent;
  let fixture: ComponentFixture<ContatInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
