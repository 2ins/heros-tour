import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropperUtilComponent } from './image-cropper-util.component';

describe('ImageCropperUtilComponent', () => {
  let component: ImageCropperUtilComponent;
  let fixture: ComponentFixture<ImageCropperUtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCropperUtilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCropperUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
