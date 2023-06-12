import { Component } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { authErrorMessages } from 'src/shared/error-messages';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FirebaseStorageService } from 'src/app/services/firebase-storage/firebase-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  rPassword: string = '';
  nextStep: boolean = false;
  user: User = new User();

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private toastrSrv: ToastrService,
    private fbStorageService: FirebaseStorageService,
    private firestore: Firestore
  ) { }

  onSubmit() {
    if (!this.validFields()) return
    this.authSrv.register(this.user).then((res) => {
      this.fbStorageService
        .setUserDoc(this.user)
        .catch((err) => console.error(err));
      setDoc(doc(this.firestore, 'users', this.user.email), { ...this.user })
      this.router.navigate(['/profile']);
    })
      .catch(error => {
        const errorCode: string = error.code || error.message;
        const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
        this.showErrorToast(errorMessage);
      })
  }

  registerWithGoogle() {
    this.authSrv
      .loginWithGoogle()
      .then((res) => {
        const user = new User();
        user.email = res.user.email ?? '';
        user.username = res.user.displayName ?? '';
        user.profilePic = res.user.photoURL ?? 'assets/image/';
        if (res.user.email) setDoc(doc(this.firestore, 'users', res.user.email), { ...user });
        else setDoc(doc(this.firestore, 'users', res.user.uid), { ...user });
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        const errorCode: string = error.code || error.message;
        const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
        this.showErrorToast(errorMessage);
      });
  }

  next(value: boolean) {
    if (value) if (!this.validFields()) return
    this.nextStep = value;
  }

  private validFields() {

    const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.nextStep) {

      if (!this.user.username || !this.user.email) {
        this.showErrorToast('Ambos campos deben estar rellenos')
        return false
      }

      if (!patronEmail.test(this.user.email)) {
        this.showErrorToast('Invalid email')
        return false
      }

    } else {

      if (!this.user.birthdate || !this.user.password || !this.rPassword) {
        this.showErrorToast('Todos los campos deben estar rellenos');
        return false
      }

      const bDate = new Date(this.user.birthdate)
      const eighteenYearsAgo = new Date();

      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

      if (bDate > eighteenYearsAgo) {
        this.showErrorToast('Debes ser mayor de edad');
        return false;
      }

      if (this.user.password !== this.rPassword) {
        this.showErrorToast('Las contraseñas deben de ser iguales');
        return false;
      }
    }
    return true
  }

  private showErrorToast(msj: string) {
    if (!this.toastrSrv.currentlyActive)
      this.toastrSrv.error(msj, 'Error', {
        positionClass: 'toast-bottom-right',
        timeOut: 3000
      });
  }
}
