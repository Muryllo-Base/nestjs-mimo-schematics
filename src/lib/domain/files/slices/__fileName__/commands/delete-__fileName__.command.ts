import { ICommand } from '@nestjs/cqrs';

export class Delete<%= classify(name) %>Command implements ICommand {
  constructor(
    public readonly <%= camelize(name) %>Id: string
  ) {}
}
