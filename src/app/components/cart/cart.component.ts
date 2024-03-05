import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart: Cart | null = null;
  cartItemCount:number=0;
  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {

    // const userId = 1; // Assuming the user ID is known
    // this.cartService.getUserCart(userId)
    //   .subscribe(
    //     (cart) => {
    //       this.cart = cart;
    //       console.log('User cart:', cart);
    //     },
    //     (error) => {
    //       console.error('Error fetching user cart:', error);
    //     }
    //   );
      this.loadCartFromLocalStorage();
  }
  private loadCartFromLocalStorage(): void {
    // Retrieve cart from local storage
    this.cart = this.cartService.getLocalStorage();
    console.log('Cart from local storage:', this.cart);
  
    if (!this.cart) {
      console.log('No cart found in local storage.');
    }
  }

}
