import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() products: Product[] | undefined
  @Input() isExternalRendered: boolean = false;

  @Input() errorMsg: string;

  allProducts: Product[] | undefined = [];

  isActive: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if(!this.isExternalRendered) {
      this.apiService.getAllProducts().subscribe({
        next: (products: any) => {
          this.allProducts = products;
          this.products = this.allProducts;
          console.log(products);
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

  // change the state of the container
  toggleSelection() { this.isActive = !this.isActive;
    console.log(this.isActive)
   }

  loadAllProducts() {
    this.products = this.allProducts;
    this.toggleSelection();
  }

  loadLaptopsAndComputers() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Laptops and Computers';
    });
    this.products = filteredProducts;
    this.toggleSelection();
  }

  loadComponentsAndPeripherals() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Components and peripherals';
    });
    this.products = filteredProducts;
    this.toggleSelection();
  }

  loadMonitors() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Monitors';
    });
    this.products = filteredProducts;
    this.toggleSelection();
  }

  loadServersAndStorages() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Servers and storages';
    });
    this.products = filteredProducts;
    this.toggleSelection();
  }

  loadPrinters() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Printers';
    });
    this.products = filteredProducts;
    this.toggleSelection();
  }

  loadRouters() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Routers';
    });
    this.products = filteredProducts;
    this.toggleSelection();
  }


}
