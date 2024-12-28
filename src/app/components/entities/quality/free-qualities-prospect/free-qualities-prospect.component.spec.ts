import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeQualitiesProspectComponent } from './free-qualities-prospect.component';

describe('FreeQualitiesProspectComponent', () => {
  let component: FreeQualitiesProspectComponent;
  let fixture: ComponentFixture<FreeQualitiesProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeQualitiesProspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeQualitiesProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
