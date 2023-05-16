import { Observable } from "rxjs";
import { Coin } from "src/app/models/coins/coin.model";
import { SimpleCoinPrice } from "src/app/models/coins/simple-coin-price.model";
import { Currency } from "src/app/models/enum/currency.enum";
import { DaysInterval } from "src/app/models/enum/days.enum";
import { InfoCoin } from "src/app/models/coins/info-coin.model";
import { OHLC } from "src/app/models/ohlc/ohlc.model";
import { TrendingSearchCoins } from "src/app/models/trending/trending-search-coins.model";

export interface ICoin {

    //List all supported coins id, name and symbol
    getCoinsList(option?: object): Observable<any>

    //Get current data for a coin
    getCoinById(id: string, option?: object): Observable<InfoCoin>

    //Get coin's OHLC
    getCoinOHLC(id: string, currency: Currency, days: DaysInterval, option?: object): Observable<OHLC[]>

    //Get trending search coins (Top-7) in the last 24 hours
    getTrending(option?: object): Observable<TrendingSearchCoins>

    //Get the current price of any cryptocurrencies in any other supported currencies that you need.
    getSimplePrice(id: string, currency: Currency, option?: object): Observable<SimpleCoinPrice>

    //Get supported coin price, market cap, volume, and market related data
    getCoinMarket(id: string, currency: Currency, option?: object): Observable<Coin>

    //Get list all supported coins price, market cap, volume, and market related data
    getListCoinsMarkets(currency: Currency, option?: object): Observable<Coin[]>


}
