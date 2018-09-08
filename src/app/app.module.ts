import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelRoomsComponent } from './hotel-rooms/hotel-rooms.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    HotelRoomsComponent,
    LoginComponent,
    OrdersComponent,
    UserComponent,
    RoomDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
