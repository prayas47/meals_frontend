import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const keyName = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private router:Router) { }

  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/'])
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(keyName);
    window.sessionStorage.setItem(keyName, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(keyName);
  }

}
