import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AppUser } from '../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  public save(user: firebase.User){
    this.db.object('/user/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  public get(uid: string): AngularFireObject<AppUser>{

   //let blah =  this.db.object('/users/' + "IDSh2aF6HrcULcUzmnCQSSIiUQE3")
    return this.db.object('/user/' + uid)
  }
}
