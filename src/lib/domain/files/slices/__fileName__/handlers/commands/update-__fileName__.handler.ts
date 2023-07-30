import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { <%= classify(name) %> } from 'src/domain/business/slices/<%= dasherize(name) %>/entities';
import { Update<%= classify(name) %>Command } from 'src/domain/business/slices/<%= dasherize(name) %>/commands';
import { <%= classify(name) %>Repository } from 'src/domain/business/slices/<%= dasherize(name) %>/repositories';

@CommandHandler(Update<%= classify(name) %>Command)
export class Update<%= classify(name) %>Handler implements ICommandHandler<Update<%= classify(name) %>Command> {

  constructor(
    private readonly repository: <%= classify(name) %>Repository
  ) {}

  async execute(command: Update<%= classify(name) %>Command): Promise<<%= classify(name) %>> {
    return this.repository.updateUnique(command.<%= camelize(name) %>Id, { title: command.title });
  }

}
