import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [UserService]
})
export class LoginComponent {

  public errorMsg: string = '';

  constructor(private userService: UserService, private router: Router) {
  }
    
  login(loginForm: NgForm) {

    const { email, password } = loginForm.value;

    if(email === '' || password === '') {
        this.errorMsg = 'Email and/or password is empty!';
        return;
    } else {
      this.errorMsg = '';
    }

    this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (e) => {
        this.errorMsg = e.error.message;
      }
       
    });
    
  }

}
