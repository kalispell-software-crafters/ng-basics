import { Component } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableService } from 'src/services/observable.service';

@Component({
  selector: 'app-observable-example',
  templateUrl: './observable-example.component.html',
  styleUrls: ['./observable-example.component.scss']
})
export class ObservableExampleComponent{

  simpleObservable = new Observable((observer) => {
    observer.next(1);
    setTimeout(() => { observer.next(2)}, 1000);
    // setTimeout(() => { observer.error(new Error("Test error!"))}, 1000); // Once we call error no more data will be processed and complete will not be called
    observer.next(3);
    setTimeout(() => { observer.next(4)}, 2000);
    setTimeout(() => { observer.next(55)}, 5000);
    setTimeout(() => { observer.complete() }, 5500); // Once we call complete no more data will be processed
  });

  constructor(private observableService: ObservableService) { 
    const observer = {
      next: (incomingValue: number) => {
        console.log("Incoming value is: ", incomingValue);
      },
      error: (error) => console.error(error.message),
      compelte: () => console.log("The observable has completed emitting values.")
    }

    const simpleObserver = this.simpleObservable.subscribe(observer);

    setTimeout(() => simpleObserver.unsubscribe(), 4000);
    // setTimeout(() => {
    //   const anotherSimpleObserver = this.simpleObservable.subscribe(
    //     (incomingValue: number) => {
    //       console.log("* Incoming value is: ", incomingValue);
    //     },
    //     (error) => console.error(error.message),
    //     () => console.log("* The observable has completed emitting values.")
    //   );
    // }, 2000);
  }

  getStream(): string {
    const numbers: number[] = [];
    
    of(...this.observableService.getStream())
      .subscribe((number: number) => { numbers.push(number) });

    return numbers.join(', ');
  }

  addToStream(num: string): void {
    this.observableService.addToStream(+num);
  }

  mapExample(): void {
    // See https://angular.io/guide/rx-library
    const nums = of(1, 2, 3);

    const squareValues = pipe(
      map((val: number) => val * val), 
      map((val: number) => val + 1)
    );
    const squaredNums = squareValues(nums);

    squaredNums.subscribe(x => console.log("Map example: " + x));
  }
}
