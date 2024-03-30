import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SearchComponent } from './shared/search/search.component';
import { ProductsRoutingModule } from './products/products-routing.module';
import { UserRoutingModule } from './user/user-routing.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent},
  
  { path: 'search', component: SearchComponent},

  { path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserRoutingModule, ProductsRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
