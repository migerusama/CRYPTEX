export class TrendingItem {
    id: string
    coin_id: number
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    small: string
    large: string
    slug: string
    price_btc: number
    score: number

    constructor(
        id: string,
        coin_id: number,
        name: string,
        symbol: string,
        market_cap_rank: number,
        thumb: string,
        small: string,
        large: string,
        slug: string,
        price_btc: number,
        score: number
    ) {
        this.id = id
        this.coin_id = coin_id
        this.name = name
        this.symbol = symbol
        this.market_cap_rank = market_cap_rank
        this.thumb = thumb
        this.small = small
        this.large = large
        this.slug = slug
        this.price_btc = price_btc
        this.score = score
    }
}