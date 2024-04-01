import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CartComponent } from '../cart/cart.component';
import { AuthGuardActivate } from '../guard/auth.guard';

const routes: Routes = [
    { path: "products",
     children: [
       { path: "", pathMatch: "full", component: ProductsComponent},
        { path: ":productId", component: ProductDetailsComponent },
        { path: ":productId/edit", component: EditProductComponent, canActivate:[AuthGuardActivate] },
      ] 
    },
    
    {path: "create-product", component: CreateProductComponent, canActivate:[AuthGuardActivate] },
    {path: "cart", component: CartComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
