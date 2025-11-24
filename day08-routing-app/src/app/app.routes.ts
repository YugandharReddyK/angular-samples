import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ProductsComponent } from './products/products';
import { ProductDetailComponent } from './product-detail/product-detail';
import { AboutComponent } from './about/about';
import { ContactComponent } from './contact/contact';
import { UsersComponent } from './users/users';
import { UserComponent } from './user/user';
import { NotFoundComponent } from './not-found/not-found';

// ROUTES CONFIGURATION
// Each route maps a URL path to a component
export const routes: Routes = [
  // Default route - loads HomeComponent when app starts
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Individual routes for each page
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  
  // DAY 9: Route Parameters - Single parameter
  // :id is a route parameter that can be read in the component
  { path: 'products/:id', component: ProductDetailComponent },
  
  { path: 'about', component: AboutComponent },
  { path: 'contact/:id/:value', component: ContactComponent },
  
  // DAY 9: Route Parameters - Another example
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserComponent },
  
  // Wildcard route - catches all undefined routes (404 page)
  // MUST be last in the array!
  { path: '**', component: NotFoundComponent }
];
