import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';



@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent, EditProductComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductsComponent, ProductDetailsComponent]
})
export class ProductsModule { }
