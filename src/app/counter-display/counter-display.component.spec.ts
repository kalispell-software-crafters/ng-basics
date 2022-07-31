import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDisplayComponent } from './counter-display.component';

describe('CounterDisplayComponent', () => {
  let component: CounterDisplayComponent;
  let fixture: ComponentFixture<CounterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count', () => {
    expect(component.displayCount()).toBe(0);
    component.incrementCount();
    expect(component.displayCount()).toBe(1);
  });
});
