import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    product = {} as Product;
    defaultCountProduct: number = 1;
    constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private router: Router, private userService: UserService) {}

    get isOwner() {
      return this.userService.user?._id === this.product._ownerId;
    } 

    ngOnInit(): void {
      this.activeRoute.params.subscribe((data) => {
        const id = data['productId'];

        this.apiService.getProduct(id).subscribe((product) => {
        this.product = product;
        });
        
      });
      
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

    addToCart(cartForm: NgForm) {
      const { countProduct } = cartForm.value;

      this.apiService.addToCart({products: {...this.product}, countProduct}, this.product._ownerId).subscribe({
        next: () => {
          this.router.navigate(['/cart']);

        },
        error: (e) => {
          console.log(e.error.message);
        }
      })
      
      
    }
}
