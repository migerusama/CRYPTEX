import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoin } from './icoin';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OHLC } from 'src/app/models/ohlc/ohlc.model';
import { DaysInterval } from 'src/app/models/enum/days.enum';
import { TrendingSearchCoins } from 'src/app/models/trending/trending-search-coins.model';
import { Currency } from 'src/app/models/enum/currency.enum';
import { SimpleCoinPrice } from 'src/app/models/coins/simple-coin-price.model';
import { Coin } from 'src/app/models/coins/coin.model';

@Injectable({
  providedIn: 'root'
})
export class CoinService implements ICoin {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCoinsList(option?: object): Observable<any> {
    let endpoint = `${this.apiUrl}/coins/list`;
    return this.http.get<any>(endpoint, option);
  }

  getCoinById(id: number, option?: object): Observable<any> {
    let endpoint = `${this.apiUrl}/coins/${id}`;
    return this.http.get<any>(endpoint, option);
  }

  getCoinOHLC(id: string, currency: Currency, days: DaysInterval, option?: object): Observable<OHLC[]> {
    let endpoint = `${this.apiUrl}/coins/${id}/ohlc?vs_currency=${currency}&days=${days}`;
    return this.http.get<OHLC[]>(endpoint, option);
  }

  getTrending(option?: object | undefined): Observable<TrendingSearchCoins> {
    let endpoint = `${this.apiUrl}/search/trending`;
    return this.http.get<TrendingSearchCoins>(endpoint, option);
  }

  getSimplePrice(id: string, currency: Currency, option?: object): Observable<SimpleCoinPrice> {
    let endpoint = `${this.apiUrl}/simple/price?ids=${id}&vs_currencies=${currency}`;
    return this.http.get<SimpleCoinPrice>(endpoint, option).pipe(
      map((response: any) => {
        const coinName = Object.keys(response)[0]; // Obtenemos el nombre de la criptomoneda (bitcoin)
        const coinPrice = response[coinName].usd; // Obtenemos el precio en USD de la criptomoneda (bitcoin)
        return { name: coinName, price: coinPrice }; // Creamos una instancia de CoinPrice con los datos obtenidos
      })
    );
  }

  getCoinMarket(id: string, currency: Currency, option?: object): Observable<Coin> {
    let endpoint = `${this.apiUrl}/coins/markets?vs_currency=${currency}&ids=${id}`;
    return this.http.get<Coin>(endpoint, option);
  }

  getListCoinsMarkets(currency: Currency, option?: object): Observable<Coin[]> {
    let endpoint = `${this.apiUrl}/coins/markets?vs_currency=${currency}`;
    return this.http.get<Coin[]>(endpoint, option);
  }
}
