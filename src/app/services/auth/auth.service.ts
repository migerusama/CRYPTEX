import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  register(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
  }

  login(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password)
  }

  logout() {
    return signOut(this.auth)
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  isLoggedIn() {
    return this.auth.currentUser ? true : false
  }

  getCurrentUser() {
    return this.auth.currentUser
  }
}
