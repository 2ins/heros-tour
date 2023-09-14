import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;
  private totalRequests = 0;

  constructor() {
    console.log('loader service');
  }
  start() {
    console.log('X0');
    this.totalRequests++;
    this.setLoading(true);
  }
  stop() {
    console.log('X1');
    this.totalRequests--;
    if (this.totalRequests == 0) {
      console.log('X2');
      console.log('(this.totalRequests: ', this.totalRequests);
      this.setLoading(false);
    }
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
