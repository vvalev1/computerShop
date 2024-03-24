import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../app.component.css','./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {
  }

  
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  } 
  get username(): any {
    const username = this.userService.user?.username || '';

    if(username !== undefined) {
      console.log(this.userService.user?.username)
      return username;
    }
    
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
    
  }


}
