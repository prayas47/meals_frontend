import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiUrl+'api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(data: any):Observable<any>{
    return this.http.post(AUTH_API + 'auth/login',data, httpOptions);
  }

  signup(data: any):Observable<any>{
    return this.http.post(AUTH_API + 'auth/signup',data, httpOptions);
  }

  addMeals(data: any):Observable<any> {
    return this.http.post(AUTH_API + 'meals/addMeals',data, httpOptions);
  }

  getMeals():Observable<any> {
    return this.http.get(AUTH_API + 'meals/fetchMealsList', httpOptions);
  }

  updateMeals(data: any,id:number):Observable<any> {
    return this.http.put(AUTH_API + `meals/updateMeals/${id}`,data, httpOptions);
  }

  deleteMeals(id:number):Observable<any> {
    return this.http.delete(AUTH_API + `meals/deleteMeals/${id}`, httpOptions);
  }

}
