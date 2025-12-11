import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-component-gallery',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    CardModule,
    PanelModule,
    AccordionModule,
    DialogModule,
    ToastModule,
    ChipModule,
    BadgeModule,
    AvatarModule,
    TagModule,
    ProgressBarModule,
    SliderModule,
    RatingModule,
    KnobModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './component-gallery.html',
  styleUrl: './component-gallery.scss',
})
export class ComponentGallery {
  // Form Controls
  textValue: string = '';
  textareaValue: string = '';
  selectedCity: City | undefined;
  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  date: Date | string = '';
  checked: boolean = false;
  selectedOption: string = 'option1';
  
  // Dialog
  visible: boolean = false;
  
  // Slider & Rating
  sliderValue: number = 50;
  ratingValue: number = 3;
  knobValue: number = 75;

  constructor(private messageService: MessageService) {}

  showDialog() {
    this.visible = true;
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
