import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { <%= classify(name) %> } from 'src/domain/business/slices/<%= dasherize(name) %>/entities';
import { Create<%= classify(name) %>Command } from 'src/domain/business/slices/<%= dasherize(name) %>/commands';
import { <%= classify(name) %>Repository } from 'src/domain/business/slices/<%= dasherize(name) %>/repositories';

@CommandHandler(Create<%= classify(name) %>Command)
export class Create<%= classify(name) %>Handler implements ICommandHandler<Create<%= classify(name) %>Command> {

  constructor(
    private readonly repository: <%= classify(name) %>Repository,
  ) {}

  async execute(command: Create<%= classify(name) %>Command): Promise<<%= classify(name) %>> {
    // Here is the perfect place to put strong and heavy business logic.
    // In CQRS, the Command handlers should perform data insertion, 
    // update and deletion using a repository and process the data 
    // to return a proper response.

    // If you want to stop the flow, throw an specialized domain exception.
    return await this.repository.create(command.foo);
  }

}
