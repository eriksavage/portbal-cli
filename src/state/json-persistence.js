import * as fs from 'node:fs';

import { Asset } from '../models/asset.js';
import { Portfolio } from '../models/portfolio.js';

const FILEPATH = './src/state/persistence.json';

const JsonPersistence = {
  async read() {
    try {
      const data = await fs.promises.readFile(FILEPATH, 'utf8');
      const portfolioData = JSON.parse(data);

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
  },

  save(portfolios) {
    const portfoliosJson = JSON.stringify(portfolios);

    fs.writeFile(FILEPATH, portfoliosJson, err => {
      if (err) console.error(err);
    });
  },
};

export { JsonPersistence };