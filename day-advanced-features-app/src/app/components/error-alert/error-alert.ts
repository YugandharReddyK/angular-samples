import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  imports: [],
  templateUrl: './error-alert.html',
  styleUrl: './error-alert.scss'
})
export class ErrorAlert {
  @Input() title = 'Error';
  @Input() message = 'An error occurred';
}
