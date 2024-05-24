"use strict";

import * as fs from 'node:fs';

class JsonPersistence {
  constructor() {

  }
  static save(portfolios) {
    const portfoliosJson = JSON.stringify(portfolios);

    fs.writeFile('./persistence.json', portfoliosJson, err => {
      if (err) console.error(err);
    });
  }
}

export { JsonPersistence };