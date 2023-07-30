import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions';

export class <%= classify(name) %>NotUpdatedDomainException extends DomainException {
  constructor() {
    super('The specified <%= classify(name) %> could not be updated in the database.', HttpStatus.NOT_FOUND);
  }
}
