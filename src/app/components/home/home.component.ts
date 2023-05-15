import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coins/coin.model';
import { Currency } from 'src/app/models/enum/currency.enum';
import { CoinService } from 'src/app/services/coin/coin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  coinList: Coin[] = [];
  btcPrice: number = 28366
  
  constructor(private coinSrv: CoinService) { }

  ngOnInit(): void {
    // this.coinSrv.getSimplePrice("bitcoin", Currency.USD).subscribe((data) => {
    //   this.btcPrice = data.price
    // })
    this.coinSrv.getListCoinsMarkets(Currency.USD).subscribe((data) => {
      this.coinList = data
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
}
