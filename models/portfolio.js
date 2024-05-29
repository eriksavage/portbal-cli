"use strict"

class Portfolio {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.assets = []; //should this be an hash map of tickers to assets vs an array?
  }

  addAsset(asset) {
    this.assets.push(asset);
  }

  // get totalValue() {
  //   return this.totalValue();
  // }

  totalValue() {
    return this.assets.reduce((a, c) => a + (c.sharesOwned * c.currentSharePrice), 0)
  }

  calculateAssetPortfolioPercentages() {
    this.assets.forEach(asset => {

      let portfolioPercentage = asset.value() / this.totalValue()
      asset.portfolioPercentage = portfolioPercentage;
    });
  }
}

export { Portfolio }