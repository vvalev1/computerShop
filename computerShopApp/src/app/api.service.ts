import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_BASE_URL } from './constants';
import { Product } from './types/product';

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

}
