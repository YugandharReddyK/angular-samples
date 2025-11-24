import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form';
import { LoginFormComponent } from './login-form/login-form';
import { ContactFormComponent } from './contact-form/contact-form';
import { ReactiveFormComponent } from './reactive-form/reactive-form';
import { RegistrationFormComponent } from './registration-form/registration-form';
import { ProfileFormComponent } from './profile-form/profile-form';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  // Day 10: Template-Driven Forms
  { path: 'template-driven', component: TemplateDrivenFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'contact', component: ContactFormComponent },
  
  // Day 11: Reactive Forms
  { path: 'reactive', component: ReactiveFormComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'profile', component: ProfileFormComponent }
];
