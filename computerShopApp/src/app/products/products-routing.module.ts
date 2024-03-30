import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
    { path: "products", 
      children: [
        { path: "", pathMatch: "full", component: ProductsComponent},
        { path: ":productId", component: ProductDetailsComponent}
      ] 
    },
    {path: "create-product", component: CreateProductComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
