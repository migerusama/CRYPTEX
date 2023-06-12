import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User as UserAuth } from 'firebase/auth';
import { FirebaseStorageService } from 'src/app/services/firebase-storage/firebase-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { updateEmail } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = new User()
  oldEmail: string = ''
  userAuth!: UserAuth
  selectedImage: File | null = null;
  isLoading: boolean = true

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private firestore: Firestore,
    private toastrSrv: ToastrService,
    private fbStorageService: FirebaseStorageService,
  ) { }

  ngOnInit(): void {
    this.authSrv.checkSession().then(data => {
      this.userAuth = this.authSrv.getCurrentUser()!
      if (this.userAuth && this.userAuth.email) {
        this.fbStorageService.getDocByUser(this.userAuth.email).subscribe((data) => {
          this.user = data as User
          this.oldEmail = this.user.email
        })
      }
      this.isLoading = false;
    })
  }

  onSubmit() {
    if (this.isValid()) {
      if (this.user.email != this.oldEmail)
        updateEmail(this.userAuth, this.user.email)
          .then()
          .catch(error => {
            this.showErrorToast('Internal error')
          })
      setDoc(doc(this.firestore, 'users', this.user.email), { ...this.user })
        .then(res => {
          if (!this.toastrSrv.currentlyActive)
            this.toastrSrv.success('Updated correctly', 'Error', {
              positionClass: 'toast-bottom-right',
              timeOut: 3000
            });
          this.router.navigate(['/profile'])
        })
        .catch(error => {
          this.showErrorToast('Internal error')
        })
    }
  }

  isValid(): boolean {
    const patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.user.username || !this.user.email) {
      this.showErrorToast('Ambos campos deben estar rellenos')
      return false
    }

    if (!patronEmail.test(this.user.email)) {
      this.showErrorToast('Invalid email')
      return false
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
