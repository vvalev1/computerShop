import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorModule } from './error/error.module';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SearchComponent } from './shared/search/search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenProvider } from './app.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CreateProductComponent,
    EditProductComponent,
    CartComponent,
    HomeComponent,
    LoaderComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ErrorModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TokenProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
