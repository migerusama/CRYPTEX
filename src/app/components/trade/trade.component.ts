import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinService } from 'src/app/services/coin/coin.service';
import { Currency } from 'src/app/models/enum/currency.enum';
import { DaysInterval } from 'src/app/models/enum/days.enum';
import * as Highcharts from 'highcharts/highstock';
import darkUnica from 'highcharts/themes/dark-unica';
import { Coin } from 'src/app/models/coins/coin.model';
import { InfoCoin } from 'src/app/models/coins/info-coin.model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  coinId: string = '';
  coin:InfoCoin | undefined

  constructor(
    private coinSrv: CoinService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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
    this.coinSrv.getCoinById(this.coinId).subscribe((data)=>{
      console.log(data);
      this.coin = data

    })
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

