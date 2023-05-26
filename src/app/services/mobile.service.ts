import { Injectable } from '@angular/core';

export const MAX_ITEMS: number = 3;

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  constructor() {}

  get nativeWindow(): any {
    return _window();
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  isTablet() {
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      navigator.userAgent
    );
  }

  isPortraitMode(): boolean {
    return window.matchMedia('(orientation: portrait)').matches || false;
  }
}

function _window(): any {
  return window;
}
