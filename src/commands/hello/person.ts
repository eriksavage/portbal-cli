import {Args, Command} from '@oclif/core'

export default class Person extends Command {
  static args = {nameArg: Args.string()}

  static description = 'Say hello to a Person'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello person! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {}

  async run(): Promise<void> {
    const {args} = await this.parse(Person);
    this.log(`hello ${args.nameArg}! (./src/commands/hello/world.ts)`)
  }
}
