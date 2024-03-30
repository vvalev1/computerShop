import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent, CreateProductComponent, EditProductComponent],
  imports: [
    CommonModule,
  ],
})
export class ProductsModule { }
