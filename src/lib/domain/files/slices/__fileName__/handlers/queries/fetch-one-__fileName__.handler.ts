import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { <%= classify(name) %> } from 'src/domain/business/slices/<%= dasherize(name) %>/entities';
import { FetchOne<%= classify(name) %>Query } from 'src/domain/business/slices/<%= dasherize(name) %>/queries';
import { <%= classify(name) %>Repository } from 'src/domain/business/slices/<%= dasherize(name) %>/repositories';

@QueryHandler(FetchOne<%= classify(name) %>Query)
export class FetchOne<%= classify(name) %>Handler implements IQueryHandler<FetchOne<%= classify(name) %>Query> {

  constructor(private readonly repository: <%= classify(name) %>Repository) {}

  async execute(query: FetchOne<%= classify(name) %>Query): Promise<<%= classify(name) %>> {
    return await this.repository.fetchUnique(query.<%= camelize(name) %>Id);
  }

}
