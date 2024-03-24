import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) {
  }
    
  login(loginForm: NgForm) {

    const { email, password } = loginForm.value;

    this.userService.login(email, password).subscribe(() => {
       this.router.navigate(['/products']);
    });
    
    console.log(this.userService.isLoggedIn)
  }

  


}
