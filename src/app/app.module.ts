import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelRoomsComponent } from './hotel-rooms/hotel-rooms.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    HotelRoomsComponent,
    LoginComponent,
    OrdersComponent,
    UserComponent,
    RoomDetailComponent,
    PageNotFoundComponent,
    MessagesComponent,
    SearchComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
