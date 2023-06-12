import { WalletItem } from "./wallet-item.model"

export class User {
    username: string
    email: string
    password: string
    birthdate: string
    wallet:WalletItem[]
    totalMoney: number
    profilePic: string

    constructor(
        username?: string,
        email?: string,
        password?: string,
        birthdate?: string,
        wallet?: WalletItem[],
        totalMoney?: number,
        profilePic?: string
    ) {
        this.username = username || ''
        this.email = email || ''
        this.password = password || ''
        this.birthdate = birthdate || ''
        this.wallet = wallet || []
        this.totalMoney = totalMoney || 0
        this.profilePic = profilePic || ''
    }
}