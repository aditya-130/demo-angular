import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from '../models/interfaces';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  public products!: Array<Product>;
  public filteredProducts:  Array<Product> =[];
  public currentCategory!: string | null;
  public categories!: Array<Category>;
  private subscription: Array<Subscription> = [];

  constructor(private productService: ProductService,
     private categoryService: CategoryService,
     private route: ActivatedRoute,
     private shoppingCartService: ShoppingCartService){}

  public ngOnInit(): void {

    this.subscription.push(
     this.productService.getAll().valueChanges().subscribe(
          products => {
            this.products = products
            this.route.queryParamMap.subscribe(params =>{
              this.currentCategory = params.get('category')
              this.filteredProducts = this.currentCategory ?
                this.products.filter(product => product.category === this.currentCategory) :
                this.products
            })
          }
        )
    );
    
    this.subscription.push(
      this.categoryService.getCategories().valueChanges().subscribe(
        categories => this.categories = categories
      )
    )
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public addToCart(product: Product){
    let cartID = localStorage.getItem('cartId');
    if(!cartID){
      this.shoppingCartService.create().then(
        result => {
          if (result.key){
            localStorage.setItem('cartId',result.key)
          }
        }
      );
    }
    else{
      
    }
  }
}
