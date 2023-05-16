import { Component } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { authErrorMessages } from 'src/shared/error-messages';
import { Router } from '@angular/router';

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
    private toastrSrv: ToastrService
  ) { }

  onSubmit() {
    const user = new User();
    user.email = this.email;
    user.password = this.password;
    this.authSrv.register(user)
      .then(res => {
        this.router.navigate(['/profile'])
      })
      .catch(error => {
        const errorCode: string = error.code || error.message;
        const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
        this.toastrSrv.error(errorMessage, 'Error', {
          positionClass: 'toast-bottom-right',
        });
      })
  }

  registerWithGoogle() {
    this.authSrv.loginWithGoogle()
      .then(res => {
        this.router.navigate(['/profile'])
      })
      .catch(error => {
        const errorCode: string = error.code || error.message;
        const errorMessage: string = authErrorMessages[errorCode] || authErrorMessages.default;
        this.toastrSrv.error(errorMessage, 'Error', {
          positionClass: 'toast-bottom-right',
        });
      })
  }
}
