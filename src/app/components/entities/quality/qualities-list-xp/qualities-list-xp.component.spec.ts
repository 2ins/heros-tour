import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QualitiesListXpComponent', () => {
  let component: QualitiesListXpComponent;
  let fixture: ComponentFixture<QualitiesListXpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualitiesListXpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QualitiesListXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
