import { IQuery } from '@nestjs/cqrs';

export class FetchOne<%= classify(name) %>Query implements IQuery {
  constructor(
    public readonly <%= camelize(name) %>Id: string
  ) {}
}
