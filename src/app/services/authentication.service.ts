import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) { }
  
  public login(): void{
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl)
     this.afAuth.signInWithPopup(new GoogleAuthProvider());
     
  }

  public logout(): void{
    this.afAuth.signOut();
  }

  public getAuthState(): Observable<firebase.User | null>{
    return this.afAuth.authState;
  }
}
