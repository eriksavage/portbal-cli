"use strict";
import { confirm, input, select } from '@inquirer/prompts';
import { JsonPersistence } from './jsonPersistence.js';

class Portfolio {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.assets = []; //should this be an hash map of tickers to assets vs an array?
  }

  addAsset(asset) {
    this.assets.push(asset);
  }

  get totalValue() {
    return this.totalValue();
  }

  totalValue() {
    return this.assets.reduce((a, c) => a + (c.sharesOwned * c.currentSharePrice), 0)
  }

  calculateAssetPortfolioPercentages() {
    this.assets.forEach(asset => {
      let portfolioPercentage = asset.value / this.totalValue
      asset.portfolioPercentage = portfolioPercentage;
    });
  }
}

class Asset {
  constructor(stockTicker, desiredPercentage, sharesOwned, currentSharePrice) {
    this.stockTicker = stockTicker;
    this.desiredPercentage = desiredPercentage;
    this.sharesOwned = sharesOwned;
    this.currentSharePrice = currentSharePrice;
  }

  portfolioPercentage = 0;

  get value() {
    return this.value();
  }

  value() {
    return this.sharesOwned * this.currentSharePrice;
  }
}

const fill = "####################"
console.log(`${fill} PORTFOLIO BALANCER ${fill}`);
const portfolios = await JsonPersistence.read();
let exit = false;

while (exit != true) {
  let selection = await mainMenu();

  switch (selection) {
    case "exit":
      exit = true;
      break;
    case "view":
      await viewPortfoliosMenu(portfolios);
      renderAssets(portfolios[0].assets)
      break;
    case "update":
      console.log(`You have selected: ${selection}`);
      break;
    case "create":
      await createPortfolio();
      break;
    default:
      exit = true;
  }
}

async function mainMenu() {
  return await select({
    message: 'Select an action',
    choices: [
      {
        name: 'View Portfolio',
        value: 'view',
        description: 'View an existing portfolio.',
      },
      {
        name: 'Update Portfolio',
        value: 'update',
        description: 'Update an existing portfolio.',
      },
      {
        name: 'Create Portfolio',
        value: 'create',
        description: 'Create a new portfolio.',
      },
      {
        name: 'Exit',
        value: 'exit',
        description: 'Exit the portfolio balancer.',
      }
    ],
  });
}

async function viewPortfoliosMenu(portfolios) {
  if (portfolios?.length > 0) {
    let choices = portfolios.map(p => {
      return {
        name: p.name,
        description: p.description,
      }
    })

    return await select({
      message: 'Select a portfolio to view.',
      choices: choices,
    });
  }

  console.log("No portfolios availble to view, please select Create Portfolio.");
}

function renderAssets(assets) {
  const assetsTable = assets.map(a => {
    return {
      'TICKER': a.stockTicker,
      'SHARES': a.sharesOwned,
      'PRICE': a.currentSharePrice,
      'VALUE': a.sharesOwned * a.currentSharePrice,
      '% ACT': a.portfolioPercentage,
      '% DES': a.desiredPercentage
    }
  });

  console.table(assetsTable);
}

async function createPortfolio() {
  const name = (await input({ message: 'Enter portfolio name:' })).trim();
  let description = (await input({ message: 'Enter portfolio description:' })).trim();
  description = description ? description : name;

  const portfolio = new Portfolio(name, description);

  const numberOfAssets = (await input({ message: 'Enter number of assets:' })).trim();

  for (let i = 1; i <= numberOfAssets; i++) {
    console.log(`Enter details for asset ${i}`)
    portfolio.addAsset(await createAsset());
  }
  portfolio.calculateAssetPortfolioPercentages();
  portfolios.push(portfolio);
  JsonPersistence.save(portfolios);
}

async function createAsset() {
  const stockTicker = await input({ message: 'Enter stock ticker:' });
  const desiredPercentage = await input({ message: 'Enter desired portfolio percentage:' });
  const sharesOwned = await input({ message: 'Enter shares owned:' });
  const currentSharePrice = await input({ message: 'Enter current share price:' });

  return new Asset(stockTicker, desiredPercentage, sharesOwned, currentSharePrice);
}
