import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

import { SERVER_BASE_URL } from '../constants';
import { UserForAuth } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  private token: string | undefined = '';

  user: UserForAuth | undefined;

  userSubscription: Subscription;

  constructor(private http: HttpClient) { 
    this.userSubscription = this.user$.subscribe((user) => 
    this.user = user);
  }

  get isLoggedIn(): boolean {
    return !!this.user || !!localStorage.getItem('token');
  }

  register(name: string, email: string, password: string) {
    return this.http.post<UserForAuth>(`${SERVER_BASE_URL}/users/register`, {name, email, password})
            .pipe(tap((user) => {
              this.user$$.next(user);
              this.token = user.accessToken;

               // Save token in local Storage only if it NOT undefined 
               if(this.token !== undefined) {
                localStorage.setItem('token', this.token);
              }
            }));
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>(`${SERVER_BASE_URL}/users/login`, {email, password})
            .pipe(tap((user) => { 
              this.user$$.next(user);
              this.token = user.accessToken;
              
              // Save token in local Storage only if it NOT undefined 
              if(this.token !== undefined) {
                localStorage.setItem('token', this.token);
              }
            }
            ));
  }

  logout() {
    return this.http.get(`${SERVER_BASE_URL}/users/logout`)
              .pipe(tap(() => {
                this.user$$.next(undefined);
                localStorage.removeItem('token');
              }));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
