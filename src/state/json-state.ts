import * as fs from 'node:fs';

import { Asset } from '../models/asset.js';
import { Holding } from '../models/holding.js';
import { Portfolio } from '../models/portfolio.js';

interface Assets {
  [key: string]: Asset
}

interface Portfolios {
  [key: string]: Portfolio
}

interface StateData {
  assets:  Assets
  portfolios: Portfolios
}

class JsonState {
  filepath() {
    return `./src/state/example-state.json`;
  }
  
  async getAsset(symbol: string) {
    const stateData = await this.read();
    if (stateData === null) return null;
    const asset = stateData.assets[symbol.toUpperCase().trim()]

    return new Asset(asset.symbol, asset.name, asset.price);
  }

  async getAssets() {
    const stateData = await this.read();
 
    if (stateData === null) return [];

    return Object.keys(stateData.assets).map(key => {
      const asset = stateData.assets[key];
      return new Asset(asset.symbol, asset.name, asset.price);
    })
  }

  async getPortfolio(name: string) {
    const stateData = await this.read();
    if (stateData === null) return null;
    // how do we want to store the portfolio names
    const portfolioState = stateData.portfolios[name.toLowerCase().trim()];

    const portfolio = new Portfolio(portfolioState.name, portfolioState.description);
    for(const holding of portfolioState.holdings) {
      portfolio.addHolding(
        new Holding(holding.symbol, holding.targetPercentage, holding.shares, this.assetPriceBySymbol(holding.symbol, stateData.assets))
      );
    }

    return portfolio;
  }

  async getPortfolios() {
    const stateData = await this.read();
    if (stateData === null) return [];
    
    const {assets, portfolios} = stateData;
    return Object.keys(portfolios).map( key => {
      const p = portfolios[key];
      const portfolio = new Portfolio(p.name, p.description);
      for ( const h of p.holdings) {
        portfolio.addHolding(
          new Holding(h.symbol, h.targetPercentage, h.shares, this.assetPriceBySymbol(h.symbol, assets))
        ); 
      }

      return portfolio;
    })
  }

  async save(data: Asset | Portfolio) {
    let stateData = await this.read();
    
    if (stateData === null) {
      stateData = {
        assets: {},
        portfolios: {},
      }
    }

    if (data instanceof Asset) {
      stateData.assets[data.symbol.toLowerCase()] = data ;
    } else {
      stateData.portfolios[data.name] = data;
    }

    const dataJson = JSON.stringify({stateData});

    fs.writeFile(this.filepath(), dataJson, err => {
      if (err) console.error(err);
    });
  }

  private assetPriceBySymbol(symbol: string, assets: Assets):number {
    return assets[symbol].price;
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

export { JsonState };