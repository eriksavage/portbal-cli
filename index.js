"use strict";
import { confirm, input, select } from '@inquirer/prompts';
import { JsonPersistence } from './jsonPersistence.js';
// import { testJs, test2 } from './test.js';

class Portfolio {
  constructor(name, description, asset) {
    this.name = name;
    this.description = description;
    this.assets = [asset];
  }
}

class Asset {
  constructor(stockTicker, desiredPercentage, sharesOwned, currentSharePrice) {
    this.stockTicker = stockTicker;
    this.desiredPercentage = desiredPercentage;
    this.sharesOwned = sharesOwned;
    this.currentSharePrice = currentSharePrice;
  }

  get currentSharePriceCents() {
    return this.currentSharePriceCents();
  }

  currentSharePriceCents() {
    return Math.round(this.currentSharePrice * 100);
  }
}

const fill = "####################"
console.log(`${fill} PORTFOLIO BALANCER ${fill}`);
const portfolios = await JsonPersistence.read();
console.log(portfolios);
let exit = false;

while (exit != true) {
  let selection = await mainMenu();

  switch (selection) {
    case "exit":
      exit = true;
      break;
    case "view":
      await viewPortfoliosMenu(portfolios);
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
// const assets = [];

// let answer;
// if (assets.length == 0) {
//   answer = await confirm({ message: 'No assets found, enter new asset?' });
// }

// if (answer == true) {

// }

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

async function createPortfolio() {
  const name = (await input({ message: 'Enter portfolio name:' })).trim();
  let description = (await input({ message: 'Enter portfolio description:' })).trim();
  description = description ? description : name;
  const portfolio = new Portfolio(name, description, await createAsset());

  portfolios.push(portfolio);
  JsonPersistence.save(portfolios);
}

async function createAsset() {
  if (await confirmMessage("Create new asset?")) {
    const stockTicker = await input({ message: 'Enter stock ticker:' });
    const desiredPercentage = await input({ message: 'Enter desired portfolio percentage:' });
    const sharesOwned = await input({ message: 'Enter shares owned:' });
    const currentSharePrice = await input({ message: 'Enter current share price:' });

    return new Asset(stockTicker, desiredPercentage, sharesOwned, currentSharePrice);
  }
}

async function confirmMessage(message) {
  return await confirm({ message: `${message}:` });
}
// testJs();
// test2();

