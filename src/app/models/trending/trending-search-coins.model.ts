import { TrendingCoins } from "./trending-coins.model";

export class TrendingSearchCoins {
    coins: TrendingCoins[]
    exchanges: any[]

    constructor(coins: TrendingCoins[], exchanges: any[]) {
        this.coins = coins
        this.exchanges = exchanges
    }
}