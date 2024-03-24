import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
    { path: "products", 
      children: [
        { path: "", pathMatch: "full", component: ProductsComponent},
        { path: ":productId", component: ProductDetailsComponent}
      ] }
];


@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ProductsRoutingModule { }
