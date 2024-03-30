import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    product = {} as Product;

    constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private router: Router) {}
    
    ngOnInit(): void {
      this.activeRoute.params.subscribe((data) => {
        const id = data['productId'];

        this.apiService.getProduct(id).subscribe((product) => {
        this.product = product;
        });
      })
    }


    removeProduct() {
      this.apiService.removeProduct(this.product._id).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (e) => {
          console.log(e.error.message);
        }
      })
    }
}
