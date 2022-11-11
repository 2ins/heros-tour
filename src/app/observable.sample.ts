import { of } from 'rxjs';

export class Sample {
  //observable example
  // Create simple observable that emits three values
  myObservable = of(1, 2, 3);

  // Create observer object
  myObserver = {
    next: (x: number) => console.log('Observer got a next value: ' + x),
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  myObserver2 = {
    next: (x: number) => console.log('Observer2 got a next value: ' + x),
    error: (err: Error) => console.error('Observer2 got an error: ' + err),
    complete: () => console.log('Observer2 got a complete notification'),
  };

  dosomething() {
    this.myObservable.subscribe(this.myObserver);
    this.myObservable.subscribe(this.myObserver2);
  }
}
