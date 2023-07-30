import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class <%= classify(name) %>NotFoundDomainException extends DomainException {
  constructor() {
    super('The specified <%= classify(name) %> was not found in the database.', HttpStatus.NOT_FOUND);
  }
}
