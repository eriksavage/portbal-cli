"use strict";
import { confirm, input, select } from '@inquirer/prompts';
// import { testJs, test2 } from './test.js';

const fill = "####################"
console.log(`${fill} PORTFOLIO BALANCER ${fill}`);
const portfolio = {
  assets: [],

}
let exit = false;

while (exit != true) {
  let selection = mainMenu();
  console.log(selection)
  switch (selection) {
    case "exit":
      exit = true;
      break;
    case "view":
      console.log(`You have selected: ${selection}`);
      break;
    case "update":
      console.log(`You have selected: ${selection}`);
      break;
    case "create":
      console.log(`You have selected: ${selection}`);
      break;
    default:
      exit = true;
  }
}
const assets = [];
// list assets, 
// enter new assets
// view portfolio %
let answer;
if (assets.length == 0) {
  answer = await confirm({ message: 'No assets found, enter new asset?' });
}

if (answer == true) {
  const stockTicker = await input({ message: 'Enter stock ticker:' });
  const portfolioPercentage = await input({ message: 'Enter desired portfolio percentage:' });
  const sharesOwned = await input({ message: 'Enter shares owned:' });
  const currentSharePrice = await input({ message: 'Enter current share price:' });
}

async function mainMenu() {
  const answer = await select({
    message: 'Select an action',
    choices: [
      {
        name: 'View Portfolio',
        value: 'view',
        description: 'npm is the most popular package manager',
      },
      {
        name: 'Update Portfolio',
        value: 'update',
        description: 'yarn is an awesome package manager',
      },
      {
        name: 'Create Portfolio',
        value: 'create',
        description: 'yarn is an awesome package manager',
      },
      {
        name: 'Exit',
        value: 'exit',
        description: 'yarn is an awesome package manager',
      }
    ],
  });
}

// testJs();
// test2();

