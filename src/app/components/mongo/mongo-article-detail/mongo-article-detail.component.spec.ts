import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoArticleDetailComponent } from './mongo-article-detail.component';

describe('MongoArticleDetailComponent', () => {
  let component: MongoArticleDetailComponent;
  let fixture: ComponentFixture<MongoArticleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MongoArticleDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongoArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
