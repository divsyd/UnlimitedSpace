import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HotelsComponent }      from './hotels/hotels.component';
import { HotelRoomsComponent }  from './hotel-rooms/hotel-rooms.component';
import { LoginComponent }  from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },
  { path: 'hotels', component: HotelsComponent },
  { path: 'rooms/:id', component: HotelRoomsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}