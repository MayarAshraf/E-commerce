import { Iuser } from './../model/iuser';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOption;
  private isloggedSubject:BehaviorSubject<boolean>;
  constructor(private httpClient:HttpClient) {
    this.httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    this.isloggedSubject=new BehaviorSubject<boolean>(false);
   }
   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Username or password is incorrect.'));

  }
  userLogin(user:Iuser):Observable<Iuser[]>{

   return this.httpClient.post<Iuser[]>('https://fakestoreapi.com/auth/login',JSON.stringify(user),this.httpOption).pipe
   (retry(2),
   tap((response:any) => {
    if (response.token) {
      localStorage.setItem('token', response.token);
      this.isloggedSubject.next(true);
    }
  }),
   catchError(this.handleError)
   );
  }
  logout(){
    localStorage.removeItem('token');
    this.isloggedSubject.next(false);
  }
  get isUserLogged(){
    return(localStorage.getItem('token'))?true:false;
  }
  getloggedStatus(){
    return this.isloggedSubject;
  }

  //Register
  userReg(user:Iuser):Observable<Iuser[]>{
    return this.httpClient.post<Iuser[]>('https://fakestoreapi.com/users',JSON.stringify(user),this.httpOption).pipe
    (retry(2),
    tap((response:any) => {
      this.isloggedSubject.next(true);
   }),
    catchError(this.handleError)
    );
  }
}
