import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter';
import { UserFormComponent } from './user-form/user-form';
import { ImageGalleryComponent } from './image-gallery/image-gallery';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CounterComponent, UserFormComponent, ImageGalleryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Day 4: Data Binding';
  
  // For interpolation examples
  userName = 'John Doe';
  currentYear = new Date().getFullYear();
  greeting = 'Welcome to Angular Data Binding!';
  
  // For property binding
  imageUrl = 'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png';
  isDisabled = false;
  buttonClass = 'primary-btn';
  
  // For event binding
  clickCount = 0;
  lastClicked = '';
  
  // For two-way binding
  userInput = '';
  
  // Methods
  calculateSum(a: number, b: number): number {
    return a + b;
  }
  
  handleClick(buttonName: string): void {
    this.clickCount++;
    this.lastClicked = buttonName;
  }
  
  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
