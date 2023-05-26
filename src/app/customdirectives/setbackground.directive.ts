import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[setbackground]',
})
export class SetBackGroundDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    //this.element.nativeElement.style.backgroundColor = 'gray';
    //this.element.nativeElement.style.width = '700px';
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'yellow'
    );
    this.renderer.setStyle(this.element.nativeElement, 'width', '500px');
    this.renderer.setAttribute(
      this.element.nativeElement,
      'title',
      'i am yellow'
    );
  }
}
