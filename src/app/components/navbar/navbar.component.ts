import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { authErrorMessages } from 'src/shared/error-messages';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: boolean = false

  constructor(
    private auth: Auth,
    private router: Router,
    private authSrv: AuthService,
    private toastrSrv: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.login = !!this.auth.currentUser
  }

  logout() {
    this.authSrv.logout()
      .then(() => {
        this.router.navigate([''])
      })
      .catch(error => {
        const errorCode: string = error.code || error.message;
        const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
        this.toastrSrv.error(errorMessage, 'Error', {
          positionClass: 'toast-bottom-right',
        });
      })
  }

  changeLanguage() {
    const lang = this.translate.currentLang == 'es' ? 'en' : 'es'
    this.translate.use(lang);
  }

}
