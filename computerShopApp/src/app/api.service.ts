import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_BASE_URL } from './constants';
import { Product } from './types/product';
import { Cart } from './types/cart';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createProduct(productValues: object, owner_id: string | undefined) {
    const baseUrl = SERVER_BASE_URL;
    return this.http.post<Product>(`${baseUrl}/data/products`, {...productValues, owner_id});
  }

  getAllProducts() {
    const baseUrl = SERVER_BASE_URL;
    return this.http.get<Product>(`${baseUrl}/data/products`);
  }

  getProduct(productId: string) {
    const baseUrl = SERVER_BASE_URL;
    return this.http.get<Product>(`${baseUrl}/data/products/${productId}`);
  }

  updateProduct(productValues: object, productId: string) {
    const baseUrl = SERVER_BASE_URL;
    return this.http.put<Product>(`${baseUrl}/data/products/${productId}`, productValues);
  }

  removeProduct(productId: string) {
    const baseUrl = SERVER_BASE_URL;
    return this.http.delete<Product>(`${baseUrl}/data/products/${productId}`);
  }

  addToCart(productValues: object, owner_id: string | undefined) {
    const baseUrl = SERVER_BASE_URL;
    return this.http.post<Cart>(`${baseUrl}/data/cart`, {...productValues, owner_id});
  }

  getCart() {
    const baseUrl = SERVER_BASE_URL;
    return this.http.get<Cart>(`${baseUrl}/data/cart`);
  }

  removeFromCart(cartId: string) {
    const baseUrl = SERVER_BASE_URL;
    return this.http.delete<Cart>(`${baseUrl}/data/cart/${cartId}`);
  }

}
