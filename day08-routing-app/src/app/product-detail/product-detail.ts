import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  icon: string;
  description: string;
  specs: string[];
  inStock: boolean;
}

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = '';
  product: Product | undefined;

  // Sample product database
  private products: Product[] = [
    { 
      id: 1, 
      name: 'Laptop', 
      price: 999, 
      icon: '💻', 
      description: 'Powerful laptop for work and gaming',
      specs: ['16GB RAM', '512GB SSD', 'Intel i7 Processor', '15.6" Display'],
      inStock: true
    },
    { 
      id: 2, 
      name: 'Smartphone', 
      price: 699, 
      icon: '📱', 
      description: 'Latest smartphone with great camera',
      specs: ['6.5" OLED Screen', '128GB Storage', '5G Capable', '48MP Camera'],
      inStock: true
    },
    { 
      id: 3, 
      name: 'Smartwatch', 
      price: 299, 
      icon: '⌚', 
      description: 'Track your fitness and stay connected',
      specs: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
      inStock: false
    },
    { 
      id: 4, 
      name: 'Headphones', 
      price: 199, 
      icon: '🎧', 
      description: 'Noise-canceling wireless headphones',
      specs: ['Active Noise Canceling', 'Bluetooth 5.0', '30hr Battery', 'Premium Sound'],
      inStock: true
    },
    { 
      id: 5, 
      name: 'Tablet', 
      price: 499, 
      icon: '📲', 
      description: 'Portable tablet for reading and browsing',
      specs: ['10.5" Display', '64GB Storage', 'All-day Battery', 'Stylus Support'],
      inStock: true
    },
    { 
      id: 6, 
      name: 'Camera', 
      price: 799, 
      icon: '📷', 
      description: 'Professional digital camera',
      specs: ['24MP Sensor', '4K Video', 'Interchangeable Lens', 'WiFi Enabled'],
      inStock: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // DAY 9: Reading route parameters
    // Method 1: Using snapshot (for one-time read)
    this.productId = this.route.snapshot.paramMap.get('id');
    
    // Find the product by ID
    if (this.productId) {
      const id = parseInt(this.productId, 10);
      this.product = this.products.find(p => p.id === id);
    }

    // Method 2: Using Observable (reactive approach - for parameter changes)
    // Uncomment to see reactive updates when route parameters change
    // this.route.paramMap.subscribe(params => {
    //   this.productId = params.get('id');
    //   if (this.productId) {
    //     const id = parseInt(this.productId, 10);
    //     this.product = this.products.find(p => p.id === id);
    //   }
    // });
  }

  goBack() {
    // Navigate back to previous page
    this.location.back();
  }
}
