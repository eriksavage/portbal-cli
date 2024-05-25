"use strict";

import * as fs from 'node:fs';

const FILEPATH = './persistence.json'; 

class JsonPersistence {
  constructor() {

  }
  static save(portfolios) {
    const portfoliosJson = JSON.stringify(portfolios);

    fs.writeFile(FILEPATH, portfoliosJson, err => {
      if (err) console.error(err);
    });
  }

  static async read() {
    try {
      const data = await fs.promises.readFile(FILEPATH, 'utf8');
      console.log(data);
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
    }
  }
}

export { JsonPersistence };