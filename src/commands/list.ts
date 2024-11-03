import {Command, Flags} from '@oclif/core'

import { JsonState } from '../state/json-state.js'

export default class List extends Command {

  static override description = 'List all portfolios and assets.'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    // flag (-a, --assets)
    assets: Flags.boolean({char: 'a', description: 'List only assets.'}),
    // flag (-p, --portfolios)
    portfolios: Flags.boolean({char: 'p', description: 'List only portfolios'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(List)
    const state: JsonState = new JsonState();
    
    if (!flags.assets) {
      const portfolios = await state.getPortfolios();
      this.log("Saved Portfolios:")
      if (portfolios.length > 0) {
        for (const portfolio of portfolios) {
          this.log(`- ${portfolio.name}`);
        }
      } else {
        this.log("- No Saved Portfolios.")
      }
    }

    if (!flags.portfolios) {
      const assets = await state.getAssets();
      this.log("Saved Assets:")
      if (assets.length > 0) {
        for (const asset of assets) {
          this.log(`- ${asset.symbol}: ${asset.name}`);
        }
      } else {
        this.log("- No Saved Assets.") 
      }
    }
  }
}