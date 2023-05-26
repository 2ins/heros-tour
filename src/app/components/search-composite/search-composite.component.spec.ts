import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompositeComponent } from './search-composite.component';

describe('SearchCompositeComponent', () => {
  let component: SearchCompositeComponent;
  let fixture: ComponentFixture<SearchCompositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCompositeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCompositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
