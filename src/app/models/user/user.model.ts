import { Wallet } from "./wallet.model"

export class User {
    username: string
    email: string
    password: string
    birthdate: string
    wallet: Wallet[]
    totalMoney: number

    constructor(
        username?: string,
        email?: string,
        password?: string,
        birthdate?: string,
        wallet?: Wallet[],
        totalMoney?: number
    ) {
        this.username = username || ''
        this.email = email || ''
        this.password = password || ''
        this.birthdate = birthdate || ''
        this.wallet = wallet || []
        this.totalMoney = totalMoney || 0
    }
}