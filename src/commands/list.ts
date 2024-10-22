import {Command, Flags} from '@oclif/core'

import { JsonState, StateType } from '../state/json-state.js'

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
    const state: JsonState = new JsonState(StateType.Portfolios)
    const portfolios = await state.read();

    if (!flags.assets) {
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
      // TODO: implement Asset state & update list test
      this.log("Saved Assets:")
      this.log("- No Saved Assets.") 
    }
  }
}