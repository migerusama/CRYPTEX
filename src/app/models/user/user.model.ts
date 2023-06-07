import { WalletItem } from "./wallet-item.model"

export class User {
    username: string
    email: string
    password: string
    birthdate: string
    wallet: Map<number, WalletItem>
    totalMoney: number
    profilePic: string

    constructor(
        username?: string,
        email?: string,
        password?: string,
        birthdate?: string,
        wallet?: Map<number, WalletItem>,
        totalMoney?: number,
        profilePic?: string
    ) {
        this.username = username || ''
        this.email = email || ''
        this.password = password || ''
        this.birthdate = birthdate || ''
        this.wallet = wallet || new Map<number, WalletItem>();
        this.totalMoney = totalMoney || 0
        this.profilePic = profilePic || ''
    }
}