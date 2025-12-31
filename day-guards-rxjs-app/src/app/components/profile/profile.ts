import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '../../services/auth';
import { CanComponentDeactivate } from '../../guards/unsaved-changes-guard';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements CanComponentDeactivate {
  user: User | null = null;
  originalData = '';
  editedData = '';
  isDirty = false;

  bio = '';
  phone = '';
  location = '';

  constructor(private authService: Auth) {
    this.user = authService.getCurrentUser();
    this.originalData = JSON.stringify({ bio: this.bio, phone: this.phone, location: this.location });
  }

  onFormChange(): void {
    this.editedData = JSON.stringify({ bio: this.bio, phone: this.phone, location: this.location });
    this.isDirty = this.originalData !== this.editedData;
  }

  save(): void {
    this.originalData = this.editedData;
    this.isDirty = false;
    alert('Profile saved successfully!');
  }

  canDeactivate(): boolean {
    return !this.isDirty;
  }
}
