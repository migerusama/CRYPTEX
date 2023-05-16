import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { InfoCoin } from 'src/app/models/coins/info-coin.model';
import { Currency } from 'src/app/models/enum/currency.enum';
import { TrendingCoins } from 'src/app/models/trending/trending-coins.model';
import { CoinService } from 'src/app/services/coin/coin.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  coinId: string = ''
  coin?: InfoCoin
  inputCoin: number = 1
  inputUsd: number = 0
  trendingCoins: TrendingCoins[] = []
  btcPrice: number = 0;

  constructor(
    private coinSrv: CoinService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.coinId = this.route.snapshot.params['coin']

    this.coinSrv.getCoinById(this.coinId).subscribe((data) => {
      this.coin = data
      this.inputUsd = this.coin.market_data.current_price.usd
    })

    this.coinSrv.getTrending().subscribe((data) => {
      this.trendingCoins = data.coins
    })

    this.coinSrv.getSimplePrice("bitcoin", Currency.USD).subscribe((data) => {
      this.btcPrice = data.price
    })
    
    //Check if change coin without refresh
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.coinId = this.route.snapshot.params['coin']
        this.coinSrv.getCoinById(this.coinId).subscribe((data) => {
          this.coin = data
          this.inputUsd = this.coin.market_data.current_price.usd
        })
      }
    });
  }

  changeColor(num: number): string {
    return num < 0 ? 'red' : 'green';
  }

  changePorcentageToPrice(porcentage: number) {
    return ((this.coin!.market_data.current_price.usd * porcentage) / 100)
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

  calculatePrice(value: number, input: number) {
    if (input === 1)
      this.inputUsd = value * this.coin!.market_data.current_price.usd
    else
      this.inputCoin = value / this.coin!.market_data.current_price.usd
  }

  priceFixed(num: number): number {
    num = num * this.btcPrice
    if (num.toString().includes('e')) {
      num = parseFloat(num.toExponential(2));
    } else {
      num = parseFloat(num.toFixed(2))
    }
    return num
  }
}
