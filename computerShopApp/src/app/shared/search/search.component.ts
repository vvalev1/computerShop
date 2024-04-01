import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  isModelHidden = false;

  products: Product[] | null;

  errorMessage: string;


  close() {
    this.isModelHidden=true;
    if(this.isModelHidden) {
      this.router.navigate(["/products"]);
    }
  }

  loadSearchedItems(productName: string) {

    this.apiService.getProductByName(productName).subscribe({
      next: (data: any) => {
        this.products = data;
        
        return this.products;
      },
      error: (e) => {
        if(e.error.code === 404) {
          return this.errorMessage = 'Sorry, there is no items found!';
        }
      } 
    })

    this.isModelHidden=true;

  }

}
