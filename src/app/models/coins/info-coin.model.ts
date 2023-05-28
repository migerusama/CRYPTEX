export type InfoCoin = {
    id: string
    symbol: string
    name: string
    asset_platform_id: any
    block_time_in_minutes: number
    hashing_algorithm: string
    public_notice: any
    additional_notices: Array<any>
    description: {
      en: string
    }
    links: {
      homepage: Array<string>
      blockchain_site: Array<string>
      official_forum_url: Array<string>
      chat_url: Array<string>
      announcement_url: Array<string>
      subreddit_url: string
      repos_url: {
        github: Array<string>
      }
    }
    image: {
      thumb: string
      small: string
      large: string
    }
    country_origin: string
    genesis_date: string
    sentiment_votes_up_percentage: number
    sentiment_votes_down_percentage: number
    watchlist_portfolio_users: number
    market_cap_rank: number
    coingecko_rank: number
    coingecko_score: number
    developer_score: number
    community_score: number
    liquidity_score: number
    public_interest_score: number
    market_data: {
      current_price: {
        eur: number
        usd: number
      }
      ath: {
        eur: number
        usd: number
      }
      ath_change_percentage: {
        eur: number
        usd: number
      }
      ath_date: {
        eur: string
        usd: string
      }
      atl: {
        eur: number
        usd: number
      }
      atl_change_percentage: {
        eur: number
        usd: number
      }
      atl_date: {
        eur: string
        usd: string
      }
      market_cap: {
        eur: number
        usd: number
      }
      market_cap_rank: number
      fully_diluted_valuation: {
        eur: number
        usd: number
      }
      total_volume: {
        eur: number
        usd: number
      }
      high_24h: {
        eur: number
        usd: number
      }
      low_24h: {
        eur: number
        usd: number
      }
      price_change_24h: number
      price_change_percentage_24h: number
      price_change_percentage_7d: number
      price_change_percentage_14d: number
      price_change_percentage_30d: number
      price_change_percentage_60d: number
      price_change_percentage_200d: number
      price_change_percentage_1y: number
      market_cap_change_24h: number
      market_cap_change_percentage_24h: number
      price_change_24h_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_1h_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_24h_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_7d_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_14d_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_30d_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_60d_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_200d_in_currency: {
        eur: number
        usd: number
      }
      price_change_percentage_1y_in_currency: {
        eur: number
        usd: number
      }
      market_cap_change_24h_in_currency: {
        eur: number
        usd: number
      }
      market_cap_change_percentage_24h_in_currency: {
        eur: number
        usd: number
      }
      total_supply: number
      max_supply: number
      circulating_supply: number
      last_updated: string
    }
    community_data: {
      facebook_likes: any
      twitter_followers: number
      reddit_average_posts_48h: number
      reddit_average_comments_48h: number
      reddit_subscribers: number
      reddit_accounts_active_48h: number
      telegram_channel_user_count: any
    }
    developer_data: {
      forks: number
      stars: number
      subscribers: number
      total_issues: number
      closed_issues: number
      pull_requests_merged: number
      pull_request_contributors: number
      code_additions_deletions_4_weeks: {
        additions: number
        deletions: number
      }
      commit_count_4_weeks: number
      last_4_weeks_commit_activity_series: Array<number>
    }
    public_interest_stats: {
      alexa_rank: number
      bing_matches: any
    }
    status_updates: Array<any>
    last_updated: string
    tickers: Array<any>
  }
  