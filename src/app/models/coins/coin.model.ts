import { Roi } from "./coin-roi.model"

export class Coin {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation?: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply?: number
    max_supply?: number
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    roi?: Roi
    last_updated: string

    constructor(
        id: string,
        symbol: string,
        name: string,
        image: string,
        current_price: number,
        market_cap: number,
        market_cap_rank: number,
        fully_diluted_valuation: number,
        total_volume: number,
        high_24h: number,
        low_24h: number,
        price_change_24h: number,
        price_change_percentage_24h: number,
        market_cap_change_24h: number,
        market_cap_change_percentage_24h: number,
        circulating_supply: number,
        total_supply: number,
        max_supply: number,
        ath: number,
        ath_change_percentage: number,
        ath_date: string,
        atl: number,
        atl_change_percentage: number,
        atl_date: string,
        roi: Roi,
        last_updated: string
    ) {
        this.id = id
        this.symbol = symbol
        this.name = name
        this.image = image
        this.current_price = current_price
        this.market_cap = market_cap
        this.market_cap_rank = market_cap_rank
        this.fully_diluted_valuation = fully_diluted_valuation
        this.total_volume = total_volume
        this.high_24h = high_24h
        this.low_24h = low_24h
        this.price_change_24h = price_change_24h
        this.price_change_percentage_24h = price_change_percentage_24h
        this.market_cap_change_24h = market_cap_change_24h
        this.market_cap_change_percentage_24h = market_cap_change_percentage_24h
        this.circulating_supply = circulating_supply
        this.total_supply = total_supply
        this.max_supply = max_supply
        this.ath = ath
        this.ath_change_percentage = ath_change_percentage
        this.ath_date = ath_date
        this.atl = atl
        this.atl_change_percentage = atl_change_percentage
        this.atl_date = atl_date
        this.roi = roi
        this.last_updated = last_updated
    }
}