import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coins/coin.model';
import { Currency } from 'src/app/models/enum/currency.enum';
import { TrendingCoins } from 'src/app/models/trending/trending-coins.model';
import { CoinService } from 'src/app/services/coin/coin.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  trendingCoins: TrendingCoins[] = []
  coinList: Coin[] = [];
  coinsByPrice: Coin[] = [];
  coinsByMarketCap: Coin[] = [];
  coinsBy24hChangeAsc: Coin[] = [];
  coinsBy24hChangeDesc: Coin[] = [];
  btcPrice: number = 28366
  max: number = 10
  isMaxed: boolean = false

  constructor(
    private coinSrv: CoinService
  ) { }

  ngOnInit(): void {
    this.coinSrv.getTrending().subscribe((data) => {
      this.trendingCoins = data.coins
    })
    this.coinSrv.getSimplePrice("bitcoin", Currency.USD).subscribe((data) => {
      this.btcPrice = data.price
    })
    this.coinSrv.getListCoinsMarkets(Currency.USD).subscribe((data) => {
      this.coinList = data
      this.coinsByPrice = this.sortByCurrentPrice([...this.coinList])
      this.coinsByMarketCap = this.sortByMarketCap([...this.coinList])
      this.coinsBy24hChangeAsc = this.sortBy24hChangeAsc([...this.coinList])
      this.coinsBy24hChangeDesc = this.sortBy24hChangeDesc([...this.coinList])
    })
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

  changeColor(num: number): string {
    return num < 0 ? 'red' : 'green';
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

  updateMax(): void {
    if (this.isMaxed) return
    else {
      this.max += 10
      if (this.max === 100) this.isMaxed = true
    }
  }

  sortByCurrentPrice(coins: Coin[]): Coin[] {
    return coins.sort((a, b) => b.current_price - a.current_price)
  }

  sortByMarketCap(coins: Coin[]): Coin[] {
    return coins.sort((a, b) => b.market_cap - a.market_cap)
  }

  sortBy24hChangeAsc(coins: Coin[]): Coin[] {
    return coins.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
  }

  sortBy24hChangeDesc(coins: Coin[]): Coin[] {
    return coins.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
  }
}
