import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestinoComponent } from './testino.component';

describe('TestinoComponent', () => {
  let component: TestinoComponent;
  let fixture: ComponentFixture<TestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
