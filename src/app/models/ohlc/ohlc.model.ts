export class OHLC {
    time: string
    open: number
    high: number
    low: number
    close: number

    constructor(
        time: string,
        open: number,
        high: number,
        low: number,
        close: number
    ) {
        this.time = time
        this.open = open
        this.high = high
        this.low = low
        this.close = close
    }
}