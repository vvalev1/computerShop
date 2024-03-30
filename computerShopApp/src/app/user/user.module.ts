import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule
  ],
  exports: [UserModule]
})
export class UserModule { }
