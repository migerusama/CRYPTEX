import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { authErrorMessages } from 'src/shared/error-messages';
import { User } from 'src/app/models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''
  password: string = ''

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private toastrSrv: ToastrService
  ) { }

  onSubmit() {
    const user = new User();
    user.email = this.email;
    user.password = this.password;
    this.authSrv.login(user)
      .then(res => {
        this.router.navigate(['/profile'])
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

  loginWithGoogle() {
    this.authSrv.loginWithGoogle()
      .then(res => {
        this.router.navigate(['/profile'])
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
}
