import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  productTypes: string[] = [
    "Laptops and Computers",
    "Components and peripherals",
    "Monitors",
    "Servers and storages",
    "Printers",
    "Routers",

  ]

  public errorMsgs: string[] = [];
  private owner_id: string | undefined;

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {
    this.owner_id = this.userService.user?._id;
  }

  createProduct(createForm: NgForm) {

    this.errorMsgs = [];
    let isError: boolean = false;

    const { name, price, imgUrl, quantity, productType, description } = createForm.value;
    

    if(name === '' || price === '' || imgUrl === '' 
      || quantity === '' || productType === '' || description === '') {

        this.errorMsgs.push('Please, fill in all the fields!');
        isError = true;
    }

    if(price <= 0) {

      this.errorMsgs.push('"Price" must be positive number!');
      isError = true;
    }

    if(quantity <= 0) {

      this.errorMsgs.push('"Quantity" must be positive number!');
      isError = true;    
    }

    if(isError) {
      return;
    }
    
    this.apiService.createProduct(createForm.value, this.owner_id).subscribe({
      next: () => {
        console.log(this.owner_id);
        this.router.navigate(['/products']);
      },
      error: (e) => {
        this.errorMsgs.push(e.error.message);
      }
    })


  }

}
