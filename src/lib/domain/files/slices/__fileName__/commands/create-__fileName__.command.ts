import { ICommand } from '@nestjs/cqrs';

export class Create<%= classify(name) %>Command implements ICommand {
  constructor(
    public readonly foo: string
  ) {}
}
