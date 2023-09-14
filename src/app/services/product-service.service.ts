import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productBaseRoute = '/products'
  constructor(private db: AngularFireDatabase) { }

  public create(product: Product): void{
    this.db.list('/products').push(product)
  }

  public getAll(): AngularFireList<Product>{
   return this.db.list('/products');
  }

  public getProduct(productId: string): AngularFireObject<Product>{
    return this.db.object(`/products/${productId}`)
  }

  public update(productId: string, product: Product){
   return this.db.object(`${this.productBaseRoute}/${productId}`).update(product)
  }

  public delete(productId:any){
    this.db.object(`${this.productBaseRoute}/${productId}`).remove();
  }
}

