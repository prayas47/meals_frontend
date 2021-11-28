import { Injectable } from '@angular/core';

const keyName = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(keyName);
    window.sessionStorage.setItem(keyName, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(keyName);
  }

}
