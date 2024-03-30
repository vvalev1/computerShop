import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    product = {} as Product;

    constructor(private apiService: ApiService, private activeRoute: ActivatedRoute) {}
    
    ngOnInit(): void {
      this.activeRoute.params.subscribe((data) => {
        const id = data['productId'];

        this.apiService.getProduct(id).subscribe((product) => {
        this.product = product;
        });
      })
    }
}
