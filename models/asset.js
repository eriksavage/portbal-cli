"use strict";

class Asset {
  constructor(stockTicker, desiredPercentage, sharesOwned, currentSharePrice) {
    this.stockTicker = stockTicker;
    this.desiredPercentage = desiredPercentage;
    this.sharesOwned = sharesOwned;
    this.currentSharePrice = currentSharePrice;
  }

  portfolioPercentage = 0;

  // get value() {
  //   return this.value();
  // }

  value() {
    return this.sharesOwned * this.currentSharePrice;
  }
}

export { Asset }; 