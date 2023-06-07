import { Component } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { authErrorMessages } from 'src/shared/error-messages';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FirebaseStorageService } from 'src/app/services/firebase/firebase-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = ''
  password: string = ''

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private toastrSrv: ToastrService,
    private fbStorageService: FirebaseStorageService,
    private firestore: Firestore
  ) { }

  onSubmit() {
    const user = new User();
    user.email = this.email;
    user.password = this.password;
    this.authSrv.register(user)
      .then(res => {
        this.fbStorageService.setUserDoc(user).catch(err => console.error(err))
        // setDoc(doc(this.firestore, 'users', user.email), { ...user })
        this.router.navigate(['/profile'])
      })
      /* .catch(error => {
        const errorCode: string = error.code || error.message;
        const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
        this.toastrSrv.error(errorMessage, 'Error', {
          positionClass: 'toast-bottom-right',
        });
      }) */
  }

  registerWithGoogle() {
    this.authSrv.loginWithGoogle()
      .then(res => {
        const user = new User()
        user.email = res.user.email ?? ""
        user.username = res.user.displayName ?? ""
        user.profilePic = res.user.photoURL ?? "assets/image/"
        if (res.user.email)
          setDoc(doc(this.firestore, 'users', res.user.email), { ...user })
        else
          setDoc(doc(this.firestore, 'users', res.user.uid), { ...user })
        this.router.navigate(['/profile'])
      })
      .catch(error => {
        console.error(error)
        const errorCode: string = error.code || error.message;
        const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
        this.toastrSrv.error(errorMessage, 'Error', {
          positionClass: 'toast-bottom-right',
        });
      })
  }
}
