"use strict";

import * as fs from 'node:fs';
import { Portfolio } from './models/portfolio.js';
import { Asset } from './models/asset.js';

const FILEPATH = './persistence.json'; 

class JsonPersistence {
  static async read() {
    try {
      const data = await fs.promises.readFile(FILEPATH, 'utf8');
      const portfolioData = JSON.parse(data);

      return portfolioData.map(p => {
        let portfolio = new Portfolio(p.name, p.description);
        p.assets.map(a => portfolio.addAsset(new Asset(a.stockTicker, a.desiredPercentage, a.sharesOwned, a.currentSharePrice)));
        return portfolio;
      })
    } catch (err) {
      console.log("⚠️ No Portfolios on File, Select Create Portfolio, to Add a Portfolio.");
      return [];
    }
  }

  static save(portfolios) {
    const portfoliosJson = JSON.stringify(portfolios);

    fs.writeFile(FILEPATH, portfoliosJson, err => {
      if (err) console.error(err);
    });
  }
}

export { JsonPersistence };