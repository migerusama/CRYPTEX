import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinService } from 'src/app/services/coin/coin.service';
import { Currency } from 'src/app/models/enum/currency.enum';
import { DaysInterval } from 'src/app/models/enum/days.enum';
import * as Highcharts from 'highcharts/highstock';
import darkUnica from 'highcharts/themes/dark-unica';
import { Coin } from 'src/app/models/coins/coin.model';
import { InfoCoin } from 'src/app/models/coins/info-coin.model';
import { Firestore, doc, getFirestore, setDoc } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { docData } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user.model';
import { WalletItem } from 'src/app/models/user/wallet-item.model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  coinId: string = '';
  coin: InfoCoin | undefined
  coinPrice: number = 0
  user: User = new User();
  usdAmount: number = 0
  coinAmount: number = 0


  constructor(
    private coinSrv: CoinService,
    private route: ActivatedRoute,
    private authSrv: AuthService,
    private toastrSrv: ToastrService
  ) { }

  ngOnInit() {
    this.authSrv.checkSession().then(data => {
      console.log(this.authSrv.getCurrentUser());
      this.getUserData()
    })
    this.coinId = this.route.snapshot.params['coin']
    this.coinSrv.getCoinOHLC(this.coinId, Currency.USD, DaysInterval.MAX).subscribe((data) => {
      darkUnica(Highcharts);
      Highcharts.stockChart('chart', {
        title: {
          text: this.coinId + ' stock price'
        },
        rangeSelector: {
          buttons: [
            // {
            //   type: 'day',
            //   count: 7,
            //   text: '7D'
            // },
            {
              type: 'day',
              count: 30,
              text: '1M'
            }, {
              type: 'day',
              count: 182,
              text: '6M'
            }, {
              type: 'day',
              count: 365,
              text: '1Y'
            }, {
              type: 'all',
              count: 1,
              text: 'All'
            }],
          selected: 1,
          inputEnabled: false
        },
        series: [{
          name: this.coinId.toUpperCase(),
          type: 'candlestick',
          data: data,
          upColor: 'green',
          color: 'red',
          colorByPoint: true,
          colors: data.map((point) => point.open > point.close ? 'green' : 'red'),
          tooltip: {
            valueDecimals: 2
          },
        }]
      });
    })
    this.coinSrv.getCoinById(this.coinId).subscribe((data) => this.coin = data)
  }

  getUserData() {
    const userAuth = this.authSrv.getCurrentUser()
    if (userAuth && userAuth.email) {
      this.user.email = userAuth.email
      docData(doc(getFirestore(), 'users', this.user.email)).subscribe({
        next: (data) => {
          this.user = data as User
        },
        error: (err) => console.error(err)
      })
    }
  }

  abbreviateNumber(num: number): string {
    const units = ["", "K", "M", "B"];
    let unitIndex = 0;
    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }
    return num.toFixed(2) + units[unitIndex];
  }
}

