import { MaxLength, MinLength } from 'class-validator';
import { Column, Table } from 'sequelize-typescript';
import { DomainEntity } from 'src/domain/models';

@Table({ tableName: '<%= underscore(name) %>'})
export class <%= classify(name) %> extends DomainEntity {

  @Column
  @MaxLength(256)
  @MinLength(8)
  public title: string;

}
