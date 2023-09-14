import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/interfaces';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  public products!: Array<SnapshotAction<Product>>
  public filteredProducts!: Array<SnapshotAction<Product>>
  private subscriptions: Array<Subscription> = [];

  constructor(private productService: ProductService){}

  public ngOnInit(): void {

    this.subscriptions.push(
      this.productService.getAll().snapshotChanges().subscribe(
        products => {
          this.products = products
          this.filteredProducts = this.products
          console.log(this.products)
        }
      )
    )
  }

 public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  public filter(query: string){
    this.filteredProducts = query ?
      this.filteredProducts.filter(
        product => product.payload.val()?.title.toLocaleLowerCase()
          .includes(query.toLowerCase())
      ) 
      : this.products
  }
}
