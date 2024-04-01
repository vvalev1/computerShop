import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() products: Product[] | null
  @Input() isExternalRendered: boolean = false;

  errorMsg = '';

  // products: Product[] | null = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if(!this.isExternalRendered) {
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


}
