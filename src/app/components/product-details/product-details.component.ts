import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { IProduct } from 'src/app/model/iproduct';
import { CartService } from 'src/app/service/cart.service';
import { ProductsService } from 'src/app/service/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  currPrdID:number=0;
  prd?:IProduct;
  prdIDsList:number[]=[];
  cartItemCount:number=0;
  cart: Cart={} as Cart;
  productQuantity:number=0;
  constructor(private activateedRoute:ActivatedRoute,
    private prdrService:ProductsService,
    private router:Router,
    private cartSer:CartService,
    private snakebar:MatSnackBar

    ){}
  ngOnInit(): void {
    this.currPrdID=Number(this.activateedRoute.snapshot.paramMap.get('pid'));
    console.log(this.currPrdID);
    this.prdrService.getProductById(this.currPrdID).subscribe(product=>{
      this.prd=product;
    });


  }



 //rate
 getStarRating(rate: number|undefined): string {
  let stars = '';
  if(rate==undefined)
  {
    return stars='';
  }
  else{
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}
}

addToCart(product: IProduct={}as IProduct) {
  const userId = 5; // Assuming the user ID is known
  const date = new Date().toISOString(); // Current date

  const newCartItem = {
    productId: product.id,
    quantity: this.productQuantity // You can adjust this as needed
  };

  this.cartSer.addToCart(userId, date, newCartItem)
    .subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        this.cartSer.updateLocalStorage(response);
        this.cartItemCount++;
        this.snakebar.open('Product added to cart', 'Close', {
          duration: 4000, // Duration in milliseconds
        });
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
}




}
