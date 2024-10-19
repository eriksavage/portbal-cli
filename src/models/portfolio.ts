import { Asset } from "../models/asset.js"

class Portfolio {
  assets: Asset[]
  description: string
  name: string
  


  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.assets = []; 
  }

  addAsset(asset: Asset) {
    this.assets.push(asset);
  }

  calculateAssetPortfolioPercentages() {
    for (const asset of this.assets) {
      const portfolioPercentage = asset.value() / this.totalValue()
      asset.portfolioPercentage = portfolioPercentage;
    }
  }

  totalValue() {
    return this.assets.reduce((a, c) => a + (c.sharesOwned * c.currentSharePrice), 0)
  }


}

export { Portfolio }