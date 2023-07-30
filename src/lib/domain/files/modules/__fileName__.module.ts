import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';

import {
  Create<%= classify(name) %>Handler,
  FetchOne<%= classify(name) %>Handler,
  Update<%= classify(name) %>Handler,
  Delete<%= classify(name) %>Handler,
} from 'src/domain/business/slices/<%= dasherize(name) %>';

import {
  <%= classify(name) %>,
  <%= classify(name) %>Repository,
  <%= classify(name) %>DomainService,
} from 'src/domain/business/slices/<%= dasherize(name) %>';

@Module({
  imports: [
    CqrsModule,
    SequelizeModule.forFeature([<%= classify(name) %>])
  ],
  providers: [
    Create<%= classify(name) %>Handler,
    FetchOne<%= classify(name) %>Handler,
    Update<%= classify(name) %>Handler,
    Delete<%= classify(name) %>Handler,
    <%= classify(name) %>Repository,
    <%= classify(name) %>DomainService
  ],
  exports: [<%= classify(name) %>DomainService]
})
export class <%= classify(name) %>Module { }
