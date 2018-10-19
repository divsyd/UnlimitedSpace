import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
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
import { RoomsComponent } from './rooms/rooms.component';
import { HotelComponent } from './hotel/hotel.component';
import { UserphotoComponent } from './user/userphoto/userphoto.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {ErrorInterceptor} from './error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    SearchComponent,
    OrderTableComponent,
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
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
