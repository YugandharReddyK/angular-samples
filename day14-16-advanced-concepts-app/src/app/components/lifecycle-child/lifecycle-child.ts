import { 
  Component, 
  Input, 
  Output, 
  EventEmitter,
  OnInit, 
  OnChanges, 
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-child',
  imports: [CommonModule],
  templateUrl: './lifecycle-child.html',
  styleUrl: './lifecycle-child.scss',
})
export class LifecycleChild implements 
  OnInit, 
  OnChanges, 
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input() message = '';
  @Output() childEvent = new EventEmitter<string>();

  localLogs: string[] = [];
  checkCounter = 0;

  constructor() {
    this.log('constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.log(`ngOnChanges - message changed from "${changes['message']?.previousValue}" to "${changes['message']?.currentValue}"`);
  }

  ngOnInit() {
    this.log('ngOnInit called');
  }

  ngDoCheck() {
    this.checkCounter++;
    if (this.checkCounter % 10 === 0) {
      this.log(`ngDoCheck called (${this.checkCounter} times)`);
    }
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit called');
  }

  ngAfterContentChecked() {
    // Called very frequently, logging only key events
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    // Called very frequently, logging only key events
  }

  ngOnDestroy() {
    this.log('ngOnDestroy called - Component being destroyed!');
  }

  sendEventToParent() {
    const data = `Event from child at ${new Date().toLocaleTimeString()}`;
    this.childEvent.emit(data);
    this.log(`Emitted event to parent: ${data}`);
  }

  private log(message: string) {
    console.log(message);
  }
}
