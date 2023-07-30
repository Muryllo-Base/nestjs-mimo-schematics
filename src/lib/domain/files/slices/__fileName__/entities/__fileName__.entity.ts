import { MaxLength, MinLength } from 'class-validator';
import { Column, Table } from 'sequelize-typescript';
import { DomainEntity } from 'src/domain/models';

@Table({ tableName: '<%= underscore(name) %>'})
export class <%= classify(name) %> extends DomainEntity {

  // 1. Here you should put the field definitions and his validators.
  // 2. Don't put business logic here.
  // 3. Mark all fields as public, as they are public.
  // 4. Don't hide fields if you don't want to show in response,
  // you can do it using a response Data Transfer Object (DTO).

  @Column
  @MinLength(8)
  @MaxLength(256)
  public foo: string;

}
