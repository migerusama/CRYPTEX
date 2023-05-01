export class Roi {
    times: number
    currency: string
    percentage: number

    constructor(times: number, currency: string, percentage: number) {
        this.times = times
        this.currency = currency
        this.percentage = percentage
    }
}