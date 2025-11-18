import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-image-gallery',
  imports: [NgFor, NgIf],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss',
})
export class ImageGalleryComponent {
  images = [
    { id: 1, url: 'https://picsum.photos/300/200?random=1', title: 'Image 1', selected: false },
    { id: 2, url: 'https://picsum.photos/300/200?random=2', title: 'Image 2', selected: false },
    { id: 3, url: 'https://picsum.photos/300/200?random=3', title: 'Image 3', selected: false },
    { id: 4, url: 'https://picsum.photos/300/200?random=4', title: 'Image 4', selected: false }
  ];
  
  selectedImage: any = null;
  
  selectImage(image: any): void {
    this.images.forEach(img => img.selected = false);
    image.selected = true;
    this.selectedImage = image;
  }
}
