import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { <%= classify(name) %> } from 'src/domain/business/slices/<%= dasherize(name) %>/entities';
import { Delete<%= classify(name) %>Command } from 'src/domain/business/slices/<%= dasherize(name) %>/commands';
import { <%= classify(name) %>Repository } from 'src/domain/business/slices/<%= dasherize(name) %>/repositories';

@CommandHandler(Delete<%= classify(name) %>Command)
export class Delete<%= classify(name) %>Handler implements ICommandHandler<Delete<%= classify(name) %>Command> {

  constructor(
    private readonly repository: <%= classify(name) %>Repository
  ) {}

  async execute(command: Delete<%= classify(name) %>Command): Promise<<%= classify(name) %>> {
    return await this.repository.deleteUnique(command.<%= camelize(name) %>Id);
  }

}
