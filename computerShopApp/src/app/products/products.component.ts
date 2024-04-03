import { Component, Input, OnInit } from '@angular/core';
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

  // isActive: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if(!this.isExternalRendered) {
      this.apiService.getAllProducts().subscribe({
        next: (products: any) => {
          this.allProducts = products;
          this.products = this.allProducts;
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
  toggleSelection(e: any) { 
  
    const listItem = e.target.id;

      switch(listItem) {
        case 'allProducts':  {
          this.loadAllProducts();
          // this.renderer.addClass(e.target, 'activeFilterLi');
          break;
        }  
        case 'computers': {
          this.loadLaptopsAndComputers();
          // this.renderer.addClass(e.target, 'activeFilterLi');
          break;
        } 
        case 'peripherals': {
          this.loadComponentsAndPeripherals();
          // this.renderer.addClass(e.target, 'activeFilterLi');
          break;
        } 
        case 'monitors': {
          this.loadMonitors();
          // this.renderer.addClass(e.target, 'activeFilterLi');
          break;
        } 
        case 'servers': {
          this.loadServersAndStorages();
          // this.renderer.addClass(e.target, 'activeFilterLi');
          break;
        } 
        case 'printers': {
          this.loadPrinters();
          // this.renderer.addClass(e.target, 'activeFilterLi');
          break;
        }
        case 'routers': {
          this.loadRouters();
          // this.renderer.removeClass(e.target, 'activeFilterLi')
          // this.renderer.addClass(e.target, 'activeFilterLi');
          break;
        } 
      }

   
    
  }

  loadAllProducts() {
    this.products = this.allProducts;    
  }

  loadLaptopsAndComputers() {
    const filteredProducts = this.allProducts?.filter((product) => {
      
    return product.productType === 'Laptops and Computers';
    });

    this.products = filteredProducts;   
    
  }

  loadComponentsAndPeripherals() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Components and peripherals';
    });

    this.products = filteredProducts;
  
  }

  loadMonitors() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Monitors';
    });

    this.products = filteredProducts;
    
  }

  loadServersAndStorages() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Servers and storages';
    });

    this.products = filteredProducts;
    
  }

  loadPrinters() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Printers';
    });

    this.products = filteredProducts;
  
  }

  loadRouters() {
    const filteredProducts = this.allProducts?.filter((product) => {
      return product.productType === 'Routers';
    });

    this.products = filteredProducts;
    
  }


}
