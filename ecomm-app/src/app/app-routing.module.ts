import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddDestinationComponent } from './components/add-destination/add-destination.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { DestinationsComponent } from './components/destinations/desinations.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QueriesComponent } from './components/queries/queries.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'destinations-list', component: ProductsComponent, canActivate:[AuthGuard] },
  { path: 'bookings', component: CartComponent, canActivate:[AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'destination/:id', component: ProductComponent, canActivate:[AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
  { path: 'queries', component: QueriesComponent, canActivate:[AuthGuard] },
  { path: 'all-destionations', component: DestinationsComponent, canActivate:[AuthGuard] },
  { path: 'all-bookings', component: BookingsComponent, canActivate:[AuthGuard] },
  { path: 'add-destionation', component: AddDestinationComponent, canActivate:[AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
