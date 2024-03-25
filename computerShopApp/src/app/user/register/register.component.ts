import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public errorMsg: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(registerForm: NgForm) {
 
    const { name, email, password, retypePassword } = registerForm.value;

    if(email=== '' || password === '' || name === '') {
      this.errorMsg = 'Please, fill in all the fields!';
      return;

    } else if(retypePassword !== password) {
      this.errorMsg = 'Password and Retype password are not equal!';
      return;

    } else {
      this.errorMsg = '';
    }


    this.userService.register(name, email, password).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (e) => {
        this.errorMsg = e.error.message;
      }
    });

  }
}
