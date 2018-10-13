import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotel/:id', component: HotelDetailComponent },
  { path: 'room/:id', component: RoomDetailComponent },
  { path: 'order', component: OrdersComponent },
  { path: 'order/:id', component: OrdersComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

export const routingComponent = [
  HotelsComponent,
  HotelDetailComponent,
  RoomDetailComponent,
  OrdersComponent,
  UserComponent,
  LoginComponent,
  SignupComponent,
  PageNotFoundComponent
];
