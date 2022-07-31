import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CounterService {
    private count: number;

    constructor() {
        this.count = 0;
    }

    getCount(): number {
        return this.count;
    }

    incrementCount(): void {
        this.count++;
    }
}