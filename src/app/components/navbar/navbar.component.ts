import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { authErrorMessages } from 'src/shared/error-messages';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: boolean = false

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private toastrSrv: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.authSrv.setCurrentUser(user!)
      this.login = !!this.authSrv.getCurrentUser()
    });
  }

  logout() {
    this.authSrv.logout()
      .then(() => {
        this.router.navigate([''])
      })
      .catch(error => {
        if (!this.toastrSrv.currentlyActive) {
          const errorCode: string = error.code || error.message;
          const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
          this.toastrSrv.error(errorMessage, 'Error', {
            positionClass: 'toast-bottom-right',
          });
        }
      })
  }

  changeLanguage() {
    const lang = this.translate.currentLang == 'es' ? 'en' : 'es'
    this.translate.use(lang);
  }

}
