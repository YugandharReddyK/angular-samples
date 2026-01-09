import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  imports: [],
  templateUrl: './success-alert.html',
  styleUrl: './success-alert.scss'
})
export class SuccessAlert {
  @Input() title = 'Success';
  @Input() message = 'Operation completed successfully';
}
