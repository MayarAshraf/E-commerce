import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Icat } from 'src/app/model/icat';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit{
  catList:Icat[]=[];
  constructor(private prdSer:ProductsService) {
    this.catList=[
      {id:0,name:'electronics'},
      {id:1,name:'jewelery'},
      {id:2,name:"men's clothing"},
      {id:3,name:"women's clothing"},
      ];
  }
  ngOnInit(): void {
    // this.prdSer.getCategories().subscribe(cat=>{
    //   this.catList=cat;
    // })
  }
  @Output() categorySelected = new EventEmitter<string>();
  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }
}
