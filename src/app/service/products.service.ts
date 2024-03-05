import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../model/iproduct';
import { Observable, map } from 'rxjs';
import { Icat } from '../model/icat';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }
  getAllProducts():Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(`${environment.APIURL}`)
  }
  getProductsByCat(category:string): Observable<IProduct[]> {
    if(category=='')
    {
      return this.httpClient.get<IProduct[]>(`${environment.APIURL}?limit=6`)
    }
    else{
    return this.httpClient.get<IProduct[]>(`${environment.APIURL}/category/${category}`);
    }
  }
  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.APIURL}/${id}`);
  }
  // getCategories(): Observable<Icat[]> {
  //   return this.httpClient.get<Icat[]>(`${environment.APIURL}/categories`);
  // }
  // getCategories(): Observable<string[]> {
  //   console.log(`${environment.APIURL}/categories`);
  //   return this.httpClient.get<Icat[]>(`${environment.APIURL}/categories`).pipe(
  //     map(categories => categories.map(category => category.name))
  //   );
  // }
}
