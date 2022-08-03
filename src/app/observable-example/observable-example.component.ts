import { Component } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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

  getStream(): Observable<number[]> {
    return this.observableService.getStream();
  }

  addToStream(num: string): void {
    this.observableService.addToStream(+num);
  }

  mapExample(): void {
    // See https://angular.io/guide/rx-library
    const nums = of(1, 2, 3);

    const mapValues = pipe(
      map((val: number) => val * val), 
      map((val: number) => val + 1),
      filter((val: number) => val % 2 == 0)
    );
    const transformedNums = mapValues(nums);

    transformedNums.subscribe(x => console.log("Map example: " + x));
  }
}
