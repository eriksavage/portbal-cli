import * as fs from 'node:fs';

import { Asset } from '../models/asset.js';
import { Portfolio } from '../models/portfolio.js';

enum StateType {
  Assets = "ASSETS",
  Portfolios = "PORTFOLIOS",
}

class JsonState {
  type: StateType

  constructor(type: StateType) {
    this.type = type;
  }

  filepath() {
    const type: string = this.type.toLowerCase();
    return `./src/state/${type}.json`;
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.filepath(), 'utf8');
      const portfolioData: Portfolio[] = JSON.parse(data);

      return portfolioData.map(p => {
        const portfolio = new Portfolio(p.name, p.description);
        p.assets.map(a => portfolio.addAsset(new Asset(a.stockTicker, a.desiredPercentage, a.sharesOwned, a.currentSharePrice)));
        return portfolio;
      })
    } catch (error) {
      console.log("⚠️ No Portfolios on File, Select Create Portfolio, to Add a Portfolio.");
      console.log(error);
      return [];
    }
  }

  save(data: Asset[]|Portfolio[]) {
    const dataJson = JSON.stringify(data);

    fs.writeFile(this.filepath(), dataJson, err => {
      if (err) console.error(err);
    });
  }
};

export { JsonState, StateType };