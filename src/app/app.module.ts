import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatTableModule,
          MatInputModule,
          MatCardModule,
          MatButtonModule,
          MatPaginatorModule,
          MatSortModule,
          MatProgressSpinnerModule } from '@angular/material';
import {AuthInterceptor} from './servers/account/auth-interceptor';
import { OrderTableComponent } from './order-table/order-table.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HotelComponent } from './hotel/hotel.component';
import { UserphotoComponent } from './user/userphoto/userphoto.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    LoginComponent,
    OrdersComponent,
    UserComponent,
    RoomDetailComponent,
    PageNotFoundComponent,
    MessagesComponent,
    SearchComponent,
    SignupComponent,
    OrderTableComponent,
    HotelDetailComponent,
    RoomsComponent,
    HotelComponent,
    UserphotoComponent
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
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
