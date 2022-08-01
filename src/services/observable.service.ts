import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ObservableService {
    private stream: number[] = [];

    constructor() {
        this.stream.push(1, 2, 3, 4);
    }

    getStream(): number[] {
        return this.stream;
    }

    addToStream(num: number): void {
        this.stream.push(num);
    }
}