import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Cart } from '../types/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // private cart$$ = new BehaviorSubject<Cart | undefined>(undefined);
  // private cart$ = this.cart$$.asObservable();

  // cartSubscription: Subscription;

  cart: Cart | undefined = undefined;

  constructor(private apiService: ApiService, private router: Router) {
    // this.cartSubscription = this.cart$.subscribe((cart) => 
    // this.cart = cart);
  }

  ngOnInit(): void {
    this.apiService.getCart().subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (e) => {
        console.log(e.error.message);
      }
    })
  }

  // ngOnDestroy(): void {
  //   this.cartSubscription.unsubscribe();
  // }

}
