class Holding {
  portfolioPercentage: number = 0;
  sharePrice: number
  shares: number
  symbol: string
  targetPercentage: number
  
  constructor(symbol: string, targetPercentage: number, shares: number, sharePrice: number) {
    this.symbol = symbol;
    this.targetPercentage = targetPercentage;
    this.shares = shares;
    this.sharePrice = sharePrice;
  }

  value() {
    return this.shares * this.sharePrice;
  }

  // TODO: add a getter for Holding price based off symbol.
}

export { Holding }; 