import { Component, OnInit } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { Coin } from 'src/app/models/coins/coin.model';
import { Currency } from 'src/app/models/enum/currency.enum';
import { User } from 'src/app/models/user/user.model';
import { WalletDataDisplay } from 'src/app/models/user/wallet-data-display.model';
import { WalletItem } from 'src/app/models/user/wallet-item.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CoinService } from 'src/app/services/coin/coin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User()
  coinList: Coin[] = []
  wallet: WalletDataDisplay[] = []
  btcPrice: number = 0

  constructor(
    private coinSrv: CoinService,
    private authSrv: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.user = new User()
    this.getUserData()
  }

  getUserData() {
    const userAuth = this.authSrv.getCurrentUser()
    if (userAuth && userAuth.email) {
      this.user.email = userAuth.email
      docData(doc(this.firestore, 'users', this.user.email)).subscribe({
        next: (data) => {
          this.user = data as User
          this.getListCoins()
        },
        error: (err) => console.error(err)
      })
    }
  }

  getListCoins() {
    this.coinSrv.getListCoinsMarkets(Currency.USD).subscribe({
      next: (data) => {
        this.coinList = data
        this.btcPrice = data.find((coin) => coin.name === "Bitcoin")!.current_price
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log(typeof this.user.wallet)
        this.user.wallet.forEach(item => {
          const coin = this.coinList.find((coin) => coin.name === item.coin)
          if (coin) {
            const wdd: WalletDataDisplay = {
              id: coin.id,
              image: coin.image,
              amount: item.amount,
              price: item.amount * coin.current_price,
              name: coin.name,
              symbol: coin.symbol
            }
            this.wallet.push(wdd)
          }
        })
      }
    })
  }

  calculateBalance() {
    return this.wallet.reduce((total, item) => total + item.price, 0)
  }

  balanceToBTC() {
    return this.calculateBalance() / this.btcPrice
  }
}
