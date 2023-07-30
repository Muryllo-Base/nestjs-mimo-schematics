import { ModelStatic } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudRepository } from 'src/domain/repositories';
import { <%= classify(name) %> } from 'src/domain/business/slices/<%= dasherize(name) %>/entities';

@Injectable()
export class <%= classify(name) %>Repository extends CrudRepository<object, object, <%= classify(name) %>> {

  constructor(@InjectModel(<%= classify(name) %>) model: ModelStatic<<%= classify(name) %>>) {
    super(model);
  }

}
