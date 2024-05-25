"use strict";

import * as fs from 'node:fs';

const FILEPATH = './persistence.json'; 

class JsonPersistence {
  static async read() {
    try {
      const data = await fs.promises.readFile(FILEPATH, 'utf8');
      return JSON.parse(data);
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