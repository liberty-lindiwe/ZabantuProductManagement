import { Component,OnInit } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'pm-root',
  templateUrl:"./app.component.html",
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pageTitle : string = 'Zabantu Online SuperMarket';

constructor( private router: Router ){}

ngOnInit(): void {
  
}

  myFunction():void{
    
      this.router.navigate(['/products']);
    
  }
}
