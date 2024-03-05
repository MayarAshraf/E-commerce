import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/model/iproduct';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  prdList:IProduct[]=[];
  selectedCategory: string="";
  constructor(private prdSer:ProductsService,private router:Router){}
  ngOnInit(): void {
    this.prdSer.getAllProducts().subscribe(products=>{
      this.prdList=products;
    })
    this.loadProducts();
  }

  //rate
  getStarRating(rate: number): string {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
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


  //filter
  loadProducts(category: string =""): void {
    this.selectedCategory = category;
    this.prdSer.getProductsByCat(category).subscribe(products => {
      this.prdList = products;
    });
  }

  //search
  searchProductById(id: number): void {
    this.prdSer.getProductById(id).subscribe(product => {
      if (product) {
        this.prdList = [product];
      } else {
        this.prdList = []; // Clear product list if no product found
      }
    });
  }
  //product details
  openPrdDetails(prdID:number){
    this.router.navigate(['/ProductDetails',prdID])
  }

}
