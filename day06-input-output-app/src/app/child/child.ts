import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class ChildComponent {
  // @Input - RECEIVE data from parent
  @Input() message: string = '';
  @Input() userName: string = '';
  @Input() userAge: number = 0;
  
  // @Output - SEND data to parent
  @Output() messageSent = new EventEmitter<string>();
  
  // Send message to parent
  sendMessageToParent(): void {
    this.messageSent.emit('Hello from Child Component!');
  }
}
