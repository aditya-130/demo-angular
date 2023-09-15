import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  public create(){
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }
}
