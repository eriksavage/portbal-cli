import * as fs from 'node:fs';

import { Asset } from '../models/asset.js';
import { Portfolio } from '../models/portfolio.js';

enum StateType {
  Assets = "ASSETS",
  Portfolios = "PORTFOLIOS",
}
interface StateData {
  portfolios: Portfolio[]
}
class JsonState {
  type: StateType

  constructor(type: StateType) {
    this.type = type;
  }

  filepath() {
    return `./src/state/state.json`;
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.filepath(), 'utf8');
      const stateData: StateData = JSON.parse(data);
      return this.getPortfolios(stateData.portfolios);
    } catch (error) {
      console.log("No state file has been created.");
      console.log(error);
      return [];
    }
  }

  save(data: Portfolio[]) {
    const dataJson = JSON.stringify({portfolios: data});

    fs.writeFile(this.filepath(), dataJson, err => {
      if (err) console.error(err);
    });
  }

  private getPortfolios(portfolios: Portfolio[]) {
    return portfolios.map(p => {
      const portfolio = new Portfolio(p.name, p.description);
      p.assets.map(a => portfolio.addAsset(new Asset(a.stockTicker, a.desiredPercentage, a.sharesOwned, a.currentSharePrice)));
      return portfolio;
    })
  }
};

export { JsonState, StateType };