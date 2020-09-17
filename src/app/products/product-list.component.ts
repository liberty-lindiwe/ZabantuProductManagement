import { Component, OnInit, OnDestroy } from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';

@Component({
   templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit
{
  pageTitle:string = 'Product List';
  showImage: boolean = false;
  errorMessage: string;

  private _listFilter: string;

  get listFilter(): string{
    return this._listFilter;
  }
  
  set listFilter(value:string){
    
    this._listFilter=value;

    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter):this.products;
  }

  filteredProducts: IProduct[];

  products: IProduct[];

 constructor(private productService: ProductService){
  
 }

 onRatingClicked(message:string): void{
   this.pageTitle = message; 
 }

 ngOnInit(): void {
   /* The subscribe method takes an optional object as a parameter which is an observer (observes the stream (json) and responds to three types of notifications nextFn, errorFn and completeFn). The nextFn is called each time an observable emits. The second
    is an error handler function, executes if there is an error. In some cases we need to know when the observable completes and we provide the completeFn to tell us that it has completed */
  this.productService.getProducts().subscribe({  //we subscribe in order to get the results from our observables
    next: products => {
      this.products = products;
      this.filteredProducts = this.products;
    },
    error: err => this.errorMessage = err
  }); 
}

toggleImage():void{
    this.showImage = !this.showImage;
  }
  
  performFilter(filterBy:string):IProduct[]{

    filterBy = filterBy.toLocaleLowerCase();
    
    return this.products.filter((product:IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
