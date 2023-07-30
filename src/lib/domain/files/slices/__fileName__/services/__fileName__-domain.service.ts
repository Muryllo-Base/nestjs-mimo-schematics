import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';

import { <%= classify(name) %> } from 'src/domain/business/slices/<%= dasherize(name) %>/entities';
import { FetchOne<%= classify(name) %>Query } from 'src/domain/business/slices/<%= dasherize(name) %>/queries';

import {
  Create<%= classify(name) %>Command,
  Delete<%= classify(name) %>Command,
  Update<%= classify(name) %>Command
} from 'src/domain/business/slices/<%= dasherize(name) %>/commands';

@Injectable()
export class <%= classify(name) %>DomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(foo: string): Promise<<%= classify(name) %>> {
    const command = new Create<%= classify(name) %>Command(foo);
    return this.commandBus.execute<ICommand, <%= classify(name) %>>(command);
  }

  async fetchById(<%= camelize(name) %>Id: string): Promise<<%= classify(name) %>> {
    const query = new FetchOne<%= classify(name) %>Query(<%= camelize(name) %>Id);
    return this.queryBus.execute<IQuery, <%= classify(name) %>>(query);
  }

  async deleteById(<%= camelize(name) %>Id: string): Promise<<%= classify(name) %>> {
    const command = new Delete<%= classify(name) %>Command(<%= camelize(name) %>Id);
    return this.commandBus.execute<ICommand, <%= classify(name) %>>(command);
  }

  async updateById(<%= camelize(name) %>Id: string, foo: string): Promise<<%= classify(name) %>> {
    const command = new Update<%= classify(name) %>Command(<%= camelize(name) %>Id, foo);
    return this.commandBus.execute<ICommand, <%= classify(name) %>>(command);
  }

}
