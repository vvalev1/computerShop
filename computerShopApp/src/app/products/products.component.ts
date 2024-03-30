import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  errorMsg = '';
  

  products: Product[] | null = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe({
    next: (products: any) => {
      this.products = products;
    },
    error: (e) => {
      if(e.error.code === 404) {
        this.errorMsg = 'No items added yet!';
      }
      return;
    }
  });
  }



}
