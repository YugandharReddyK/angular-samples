import { Component, signal } from '@angular/core';
import { ChangeDetectionDefault } from '../change-detection-default/change-detection-default';
import { ChangeDetectionOnpush } from '../change-detection-onpush/change-detection-onpush';

@Component({
  selector: 'app-change-detection-demo',
  imports: [ChangeDetectionDefault, ChangeDetectionOnpush],
  templateUrl: './change-detection-demo.html',
  styleUrl: './change-detection-demo.scss'
})
export class ChangeDetectionDemo {
  defaultUser = signal({ name: 'John Doe', age: 30 });
  onPushUser = signal({ name: 'Jane Smith', age: 25 });
  
  updateDefaultUserMutate(): void {
    // Mutating object - Default will detect, OnPush won't
    const user = this.defaultUser();
    user.age++;
  }
  
  updateDefaultUserImmutable(): void {
    // Immutable update - Both will detect
    this.defaultUser.update(user => ({ ...user, age: user.age + 1 }));
  }
  
  updateOnPushUserMutate(): void {
    const user = this.onPushUser();
    user.age++;
  }
  
  updateOnPushUserImmutable(): void {
    this.onPushUser.update(user => ({ ...user, age: user.age + 1 }));
  }
}
