import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ProductsComponent } from './products/products';
import { AboutComponent } from './about/about';
import { ContactComponent } from './contact/contact';
import { NotFoundComponent } from './not-found/not-found';

// ROUTES CONFIGURATION
// Each route maps a URL path to a component
export const routes: Routes = [
  // Default route - loads HomeComponent when app starts
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Individual routes for each page
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact/:id/:value', component: ContactComponent },
  
  // Wildcard route - catches all undefined routes (404 page)
  // MUST be last in the array!
  { path: '**', component: NotFoundComponent }
];
