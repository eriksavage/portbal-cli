import * as fs from 'node:fs';

import { Asset } from '../models/asset.js';
import { Holding } from '../models/holding.js';
import { Portfolio } from '../models/portfolio.js';

enum StateType {
  Assets = "ASSETS",
  Portfolios = "PORTFOLIOS",
}
interface StateData {
  assets: Asset[]
  portfolios: Portfolio[]
}
class JsonState {
  filepath() {
    return `./src/state/example-state.json`;
  }
  
  async getAssets() {
    const stateData = await this.read()
 
    if (stateData === null) return [];

    return stateData.assets.map(a => new Asset(a.symbol, a.name, a.price));
  }

  async getPortfolios() {
    const stateData = await this.read();
    if (stateData === null) return [];
    
    const {assets, portfolios} = stateData;
    return portfolios.map(p => {
      const portfolio = new Portfolio(p.name, p.description);
      for ( const h of p.holdings) {
        portfolio.addHolding(
          new Holding(h.symbol, h.targetPercentage, h.shares, this.assetPriceBySymbol(h.symbol, assets))
        ); 
      }

      return portfolio;
    })
  }

  isAssetArray(data: Asset[] | Portfolio[]): data is Asset[] {
    return data[0] instanceof Asset;
  }

  async save(data: Asset[] | Portfolio[]) {
    let stateData = await this.read();
    
    if (stateData === null) {
      stateData = {
        assets: [],
        portfolios: [],
      }
    }

    if (this.isAssetArray(data)) {
      stateData.assets = data;
    } else {
      stateData.portfolios = data;
    }

    const dataJson = JSON.stringify({stateData});

    fs.writeFile(this.filepath(), dataJson, err => {
      if (err) console.error(err);
    });
  }

  private assetPriceBySymbol(symbol: string, assets: Asset[]):number {
   let price = 0;

    for (const asset of assets) {
      if (asset.symbol === symbol) price = asset.price;
   }

   return price;
  }

  private async read() {
    try {
      const data = await fs.promises.readFile(this.filepath(), 'utf8');
      const stateData: StateData = JSON.parse(data);
      return stateData;
    } catch (error) {
      console.log("No state file has been created.");
      console.log(error);
      return null;
    }
  }
};

export { JsonState, StateType };