import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CoinList } from 'src/app/models/coins/coin-list.model';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() id: string = ''
  @Input() titulo: string = ''
  @Input() user!: User
  @Input() etiquetas: string[] = []
  @Input() mode: string = ''
  @Input() buttonText: string = ''

  public funcionCompletada = false;

  amount: number = 0
  coin: string = ''

  selectCoinList: CoinList[] = []

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private toastrSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.http.get<CoinList[]>('assets/coins-list.json').subscribe(data => this.selectCoinList = data);
  }

  guardar() {
    if (!this.etiquetas[1]) this.coin = 'tether'
    if (this.amount <= 0 || !this.coin) {
      this.toastrSrv.error('No puede haber campos vacios', 'Error', {
        positionClass: 'toast-bottom-right'
      });
      return
    }

    let walletItem = this.user.wallet.find(coin => coin.coin == this.coin)
    if (walletItem) {
      if (this.mode == 'add') walletItem.amount += this.amount
      else if (this.mode == 'remove') {
        if ((walletItem.amount - this.amount) < 0) {
          this.toastrSrv.error(`No puedes retirar más de ${walletItem.amount}`, 'Error', {
            positionClass: 'toast-bottom-right'
          });
          return
        }
        walletItem.amount -= this.amount
        if (walletItem.amount == 0) this.user.wallet.splice(this.user.wallet.indexOf(walletItem), 1)
      }
    } else if (this.mode == 'add') {
      walletItem = { coin: this.coin, amount: this.amount }
      this.user.wallet.push(walletItem)
    } else {
      this.toastrSrv.error('Debes tener esa moneda', 'Error', {
        positionClass: 'toast-bottom-right'
      });
      return
    }

    setDoc(doc(this.firestore, 'users', this.user.email), { ...this.user })
  }
}
