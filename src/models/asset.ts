class Asset {
  currentSharePrice: number
  desiredPercentage: number
  portfolioPercentage: number = 0;
  sharesOwned: number
  sharesToBuy: number = 0;
  stockTicker: string
  
  constructor(stockTicker: string, desiredPercentage: number, sharesOwned: number, currentSharePrice: number) {
    this.stockTicker = stockTicker;
    this.desiredPercentage = desiredPercentage;
    this.sharesOwned = sharesOwned;
    this.currentSharePrice = currentSharePrice;
  }

  value() {
    return this.sharesOwned * this.currentSharePrice;
  }
}

export { Asset }; 