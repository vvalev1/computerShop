import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Cart } from '../types/cart';
import { Product } from '../types/product';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cart$$ = new BehaviorSubject<Cart[] | null>(null);
  private cart$ = this.cart$$.asObservable();

  total: number = 0;
  subtotal: number = 0;
  // It will come from some service some day.
  estimatedShipping: number = 5

  succsessMessage: string = '';
  isHideCheckOut: boolean = false;

  cartSubscription: Subscription;

  countProductForm: NgForm;

  cart: Cart[] | null = [];

  constructor(private apiService: ApiService, private router: Router) {
    this.cartSubscription = this.cart$.subscribe((cart) =>
      this.cart = cart);
  }

  // const total = data.products.price * data.count;
  //       console.log(total);
  //       this.countAndTotalPerProduct = [{
  //         count: data.count,
  //         total: total, 
  //         _id: data._id,
  //       }];

  ngOnInit(): void {
    this.apiService.getCart().subscribe({
      next: (data: any) => {
        // console.log(data);
        let newArrCart = [];

        for (let product of data) {
          const newObjectCart = { ...product, total: Number(product.products.price) * product.countProduct };
          newArrCart.push(newObjectCart);

          // calculate total
          this.subtotal += Number(newObjectCart.total);
          this.total = Number(this.subtotal) + Number(this.estimatedShipping);
        }

        this.cart = newArrCart;
        this.cart$$.next(newArrCart);
      },
      error: (e) => {
        this.isHideCheckOut = true;
        this.estimatedShipping = 0;
        // console.log(e.error.message);
        return;
      }
    })

  }

 

  removeProductFromCart(cartId: string) {
    this.subtotal = 0;
    this.total = 0;

    this.apiService.removeFromCart(cartId).subscribe({
      next: () => {
        this.apiService.getCart().subscribe({
          next: (data: any) => {
            // console.log(data);
            let newArrCart = [];

            for (let product of data) {
              const newObjectCart = { ...product, total: Number(product.products.price) * product.countProduct };
              newArrCart.push(newObjectCart);

              // calculate total
              this.subtotal += Number(newObjectCart.total);
              this.total = Number(this.subtotal) + Number(this.estimatedShipping);
            }
            if(newArrCart.length <= 0) {
              // setEstimatedShipping = 0 if there are not items in the cart
              this.estimatedShipping = 0;
              this.isHideCheckOut = true;
            }

            this.cart = newArrCart;
            this.cart$$.next(newArrCart);
          },
          error: (e) => {
            // console.log(e.error.message);
            return;
          }
        });
        this.router.navigate(['/cart']);
      },
      error: (e) => {
        // console.log(e.error.message);
      }
    })
  }

  checkout() {
    this.cart?.forEach((product) => {
      this.removeProductFromCart(product._id);
    })
    // calculate total
    this.subtotal = 0;
    this.estimatedShipping = 0;
    this.total = 0;
    this.succsessMessage="Successful order!"
    this.isHideCheckOut=true;
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

}
