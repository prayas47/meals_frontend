import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import CartList from 'src/assets/data/cart.json'
interface PRODUCTS {
  name: string;
  price:number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private _list:PRODUCTS[] = CartList;
  private syncList = new BehaviorSubject(this._list);

  get observableList(): Observable<PRODUCTS[]> {
    return this.syncList.asObservable()
  }

  add(item: PRODUCTS) {
      this._list.push(item);
      this.syncList.next(this._list);
  }

  remove(index: number) {
    this._list.splice(index, 1);
    this.syncList.next(this._list);
  }

  total():number{
    let total = 0
    this._list.forEach(element => {
      total += element.price
    });
    return total
  }
}
