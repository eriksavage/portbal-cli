import * as fs from 'node:fs';

import { Holding } from '../models/holding.js';
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
    // TODO: when reading files, get the latest asset price and pass that into the Holding
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
      p.holdings.map(h => portfolio.addHolding(new Holding(h.symbol, h.targetPercentage, h.shares, h.sharePrice)));
      return portfolio;
    })
  }
};

export { JsonState, StateType };