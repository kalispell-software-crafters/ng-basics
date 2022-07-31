import { Component } from '@angular/core';
import { CounterService } from 'src/services/counter.service';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.scss']
})
export class CounterDisplayComponent {

  constructor(private counterService: CounterService) { }

  displayCount(): number {
    return this.counterService.getCount();
  }

  incrementCount(): void {
    this.counterService.incrementCount();
  }

}
