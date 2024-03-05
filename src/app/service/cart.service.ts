import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private localStorageKey = 'userCart';
  constructor(private http:HttpClient) { }

  addToCart(userId: number, date: string, newItem: { productId: number; quantity: number }): Observable<Cart> {
    const apiUrl = 'https://fakestoreapi.com/carts';

    return this.http.post<Cart>(apiUrl, {
      userId,
      date,
      products: [newItem]
    });
  }

  getUserCart(userId: number): Observable<Cart> {
    const apiUrl = `https://fakestoreapi.com/carts?userId=${userId}`;
    return this.http.get<Cart>(apiUrl);
  }
  updateLocalStorage(cart: Cart): void {
    let existingCart: Cart | null = this.getLocalStorage();

    if (existingCart) {
      // Merge new cart items with existing ones
      existingCart.products = existingCart.products.concat(cart.products);
      localStorage.setItem(this.localStorageKey, JSON.stringify(existingCart));
    } else {
      // If no existing cart, just set the new one
      localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
    }
  }


  getLocalStorage(): Cart | null {
    const cartStr = localStorage.getItem(this.localStorageKey);
    return cartStr ? JSON.parse(cartStr) : null;
  }


}
