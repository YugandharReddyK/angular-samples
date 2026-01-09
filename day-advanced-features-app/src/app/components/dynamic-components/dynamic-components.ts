import { Component, ViewChild, ViewContainerRef, ComponentRef, signal } from '@angular/core';
import { SuccessAlert } from '../success-alert/success-alert';
import { ErrorAlert } from '../error-alert/error-alert';
import { Alert } from '../alert/alert';

@Component({
  selector: 'app-dynamic-components',
  imports: [],
  templateUrl: './dynamic-components.html',
  styleUrl: './dynamic-components.scss'
})
export class DynamicComponents {
  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  componentCount = signal(0);
  private componentRefs: ComponentRef<any>[] = [];

  showSuccess(): void {
    const componentRef = this.container.createComponent(SuccessAlert);
    componentRef.instance.title = 'Success!';
    componentRef.instance.message = `Dynamic component #${this.componentCount() + 1} created successfully`;
    
    this.componentRefs.push(componentRef);
    this.componentCount.update(c => c + 1);
    
    // Auto-remove after 5 seconds
    setTimeout(() => this.removeComponent(componentRef), 5000);
  }

  showError(): void {
    const componentRef = this.container.createComponent(ErrorAlert);
    componentRef.instance.title = 'Error!';
    componentRef.instance.message = `Something went wrong with component #${this.componentCount() + 1}`;
    
    this.componentRefs.push(componentRef);
    this.componentCount.update(c => c + 1);
    
    setTimeout(() => this.removeComponent(componentRef), 5000);
  }

  showWarning(): void {
    const componentRef = this.container.createComponent(Alert);
    componentRef.instance.title = 'Warning!';
    componentRef.instance.message = `This is a warning message #${this.componentCount() + 1}`;
    componentRef.instance.type = 'warning';
    
    this.componentRefs.push(componentRef);
    this.componentCount.update(c => c + 1);
    
    setTimeout(() => this.removeComponent(componentRef), 5000);
  }

  showInfo(): void {
    const componentRef = this.container.createComponent(Alert);
    componentRef.instance.title = 'Info';
    componentRef.instance.message = `Informational message #${this.componentCount() + 1}`;
    componentRef.instance.type = 'info';
    
    this.componentRefs.push(componentRef);
    this.componentCount.update(c => c + 1);
    
    setTimeout(() => this.removeComponent(componentRef), 5000);
  }

  clearAll(): void {
    this.componentRefs.forEach(ref => ref.destroy());
    this.componentRefs = [];
    this.container.clear();
  }

  private removeComponent(componentRef: ComponentRef<any>): void {
    const index = this.componentRefs.indexOf(componentRef);
    if (index > -1) {
      this.componentRefs.splice(index, 1);
      componentRef.destroy();
    }
  }
}
