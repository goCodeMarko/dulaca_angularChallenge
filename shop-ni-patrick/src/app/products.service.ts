import { Injectable } from '@angular/core';
import { IProduct } from "./IProduct";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient: HttpClient) { }

  public baseURL: string = "http://localhost:3000/products";

  getProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(this.baseURL)
      .pipe(catchError(this.errorHandler))
  }

  errorHandler(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.log('Server Side Error: ', errorResponse)
    }
    return throwError('There is a problem with the service. We\'re notified & working on it. Please try again later.')
  }
}
