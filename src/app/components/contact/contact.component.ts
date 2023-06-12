import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = ''
  email: string = ''
  mensaje: string = ''

  constructor(
    private toastrSrv: ToastrService
  ) { }

  enviarFormulario() {
    if (!this.toastrSrv.currentlyActive)
      if (this.name && this.email && this.mensaje) {
        this.toastrSrv.success("Mensaje enviado correctamente", 'Success', {
          positionClass: 'toast-bottom-right'
        })
        this.email = ''
        this.mensaje = ''
      } else {
        this.toastrSrv.error("Error en los campos:\n no pueden estar vacios", 'Error', {
          positionClass: 'toast-bottom-right'
        })
      }

  }
}
