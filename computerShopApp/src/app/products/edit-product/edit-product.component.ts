import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements AfterViewInit {

  product = {} as Product;

  productTypes: string[] = [
    "Laptops and Computers",
    "Components and peripherals",
    "Monitors",
    "Servers and storages",
    "Printers",
    "Routers",
  ]

  @ViewChild('editProductForm') editForm: NgForm;


  public errorMsgs: string[] = [];

  constructor(private apiService: ApiService, private activeRoute: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['productId'];

      this.apiService.getProduct(id).subscribe((product) => {
        this.product = product;
      });
    })

  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.editForm.form.setValue({
        productName: this.product.productName,
        price: this.product.price,
        imageUrl: this.product.imageUrl,
        quantity: this.product.quantity,
        productType: this.product.productType,
        description: this.product.description
      })
    }, 200);
  }

  updateProduct(updateForm: NgForm) {

    this.errorMsgs = [];
    let isError: boolean = false;

    const { productName, price, imgUrl, quantity, productType, description } = updateForm.value;

    if (productName === '' || price === '' || imgUrl === ''
      || quantity === '' || productType === '' || description === '') {

      this.errorMsgs.push('Please, fill in all the fields!');
      isError = true;
    }

    if (price <= 0) {

      this.errorMsgs.push('"Price" must be positive number!');
      isError = true;
    }

    if (quantity <= 0) {

      this.errorMsgs.push('"Quantity" must be positive number!');
      isError = true;
    }

    if (isError) {
      return;
    }

    this.apiService.updateProduct(updateForm.value, this.product._id).subscribe({
      next: () => {
        this.router.navigate([`products/${this.product._id}`])
      },
      error: (e) => {
        this.errorMsgs.push(e.error.message);
      }
    })

  }

}
