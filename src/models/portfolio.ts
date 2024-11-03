import { Holding } from "./holding.js"

class Portfolio {
  description: string
  holdings: Holding[]
  name: string
  
  constructor(name: string, description: string) {
    this.description = description;
    this.holdings = []; 
    this.name = name;
  }

  addHolding(holding: Holding) {
    this.holdings.push(holding);
  }

  calculateHoldingPortfolioPercentages() {
    for (const holding of this.holdings) {
      const portfolioPercentage = holding.value() / this.totalValue()
      holding.portfolioPercentage = portfolioPercentage;
    }
  }

  totalValue() {
    return this.holdings.reduce((a, c) => a + (c.shares * c.sharePrice), 0)
  }
}

export { Portfolio }