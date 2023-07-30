import { ICommand } from '@nestjs/cqrs';

export class Update<%= classify(name) %>Command implements ICommand {
  constructor(
    public readonly <%= camelize(name) %>Id: string,
    public readonly title: string
  ) {}
}
