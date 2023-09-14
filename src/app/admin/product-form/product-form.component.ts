import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, Product } from 'src/app/models/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  public product: Product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: ''
  };

  public categories!: Array<Category>;
  public id!: string | null;
  private subscriptions: Array<Subscription> =[];

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.categoryService.getCategories().valueChanges().subscribe(
        categories => {
          this.categories = (categories as Array<Category>).sort();
          console.log(categories);
        }
      )
    )
    this.id = this.route.snapshot.paramMap.get('id')
    if( this.id){
      this.subscriptions.push(
        this.productService.getProduct(this.id).valueChanges().subscribe(
          product => product? this.product = product : this.product
        )
      )
    }   
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public save(product: Product): void{
    if(this.id){
      this.productService.update(this.id, this.product);
    }
    else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products'])
  }

  public delete(): void{
    if (confirm(`Are you sure you want to delete this product: ${this.product.title}`)){
      this.productService.delete(this.id)
      this.router.navigate(['/admin/products'])
    }
    else return
  }

}
