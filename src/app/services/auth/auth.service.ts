import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';
import { User } from 'src/app/models/user/user.model';
import { User as UserAuth, getAuth, onAuthStateChanged } from 'firebase/auth';


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

  setCurrentUser(user: UserAuth) {
    this.auth.updateCurrentUser(user)
    return this.auth.currentUser
  }

  async checkSession(): Promise<void> {
    return new Promise<void>(resolve => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.setCurrentUser(user!)
        resolve();
      });
    });
  }

}
