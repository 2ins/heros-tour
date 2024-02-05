import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoTestComponent } from './mongo-test.component';

describe('MongoTestComponent', () => {
  let component: MongoTestComponent;
  let fixture: ComponentFixture<MongoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MongoTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
