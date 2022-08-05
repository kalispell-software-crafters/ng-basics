import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ObservableService {
    private stream: number[] = [];

    constructor() {
        this.stream.push(1, 2, 3, 4);
    }

    getStream(): Observable<number[]> {
        return of(this.stream);
    }

    addToStream(num: number): void {
        this.stream.push(num);
    }
}
