import { ModelStatic } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudRepository } from 'src/domain/repositories';
import { <%= classify(name) %> } from 'src/domain/business/slices/<%= dasherize(name) %>/entities';

@Injectable()
export class <%= classify(name) %>Repository extends CrudRepository<object, object, <%= classify(name) %>> {

  constructor(@InjectModel(<%= classify(name) %>) model: ModelStatic<<%= classify(name) %>>) {
    super(model); // <-- Don't remove this line, it should call the parent constructor.
  }

  // 1. Most of the CRUD methods are already available since the repository 
  // has a wide variety of methods that query the database.

  // 2. Here you can put your custom repository methods, complex queries, etc.
  // Just don't put business logic here.

  // 3. The main goal of a repository is perform queries in the database, not
  // perform data processing, transformation, validation, etc.
}
