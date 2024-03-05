import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ColorService } from 'src/app/service/color.service';
import { UsersService } from 'src/app/service/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  selectedColor: string='';
  isUserLogged:boolean=false;
  cartItemCount:number=0;

  constructor(private colorService: ColorService,private userSer:UsersService,private CartService:CartService) {}
  ngOnInit(): void {
    this.userSer.getloggedStatus().subscribe(status=>{
      this.isUserLogged=status;
      console.log(status);
    });
    this.updateCartItemCount();
  }
  logout(){
    this.userSer.logout();
  }

  changeWebsiteColor(): void {
    this.colorService.setWebsiteColor(this.selectedColor);
  }
  updateCartItemCount() {
    const cart = this.CartService.getLocalStorage();
    if (cart) {
      // Calculate total number of items in the cart
      this.cartItemCount = cart.products.reduce((total, product) => total + product.quantity, 0);
    }
  }
}
