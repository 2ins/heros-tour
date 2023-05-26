import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input() defaultColor: string = 'red';

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostBinding('style.backgroundColor') background: string = this.defaultColor;
  @HostListener('mouseenter') onmouseover() {
    this.renderer.setStyle(this.element.nativeElement, 'margin', '10px');
    this.renderer.setStyle(this.element.nativeElement, 'transition', '1s');
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.defaultColor
    );
  }

  @HostListener('mouseleave') mouseout() {
    this.renderer.setStyle(this.element.nativeElement, 'margin', '0px');
    this.renderer.setStyle(this.element.nativeElement, 'transition', '1s');
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'red'
    );
  }

  @HostBinding('style.margin') margin: string = '3px';
}
