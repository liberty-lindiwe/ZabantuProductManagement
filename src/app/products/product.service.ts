import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators'; //tap allows us to look into the json data 
import { IProduct} from './product';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProductService{

  private productUrl = 'api/products/products.json';   //local json file provided with the started files (defined in the angular.json file)
   
  constructor(private http: HttpClient){}

  getProducts(): Observable<IProduct[]>{

    return this.http.get<IProduct[]>(this.productUrl).pipe (
      tap(data => console.log('All:' + JSON.stringify(data))),  //this is for error handling
      catchError(this.handleError)
    );
   
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  private handleError(err:HttpErrorResponse){
    let errorMessage='';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
 
} 

