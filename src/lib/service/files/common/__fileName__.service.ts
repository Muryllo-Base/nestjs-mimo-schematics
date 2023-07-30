import { Injectable } from '@nestjs/common';
// import { <%= classify(name) %>DomainService } from 'src/domain';
// import { <%= classify(name) %>RequestDto, <%= classify(name) %>ResponseDto } from 'src/common/dto';

@Injectable()
export class <%= classify(name) %>Service {

  // This is a sample of Common Service. 
  // Update the source and change according with your use cases.

  constructor(
    /* private readonly <%= camelize(name) %>DomainService: <%= classify(name) %>DomainService */
  ) {}

  // The methods below are illustrations of CRUD calls that are passed to 
  // the immediately inner layer (domain). The responsibility of this class 
  // is simply to receive the request, perform some treatments on the inputs, 
  // and then pass it on to the domain. Conversions into DTOs are also done here.

  // async create<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>RequestDto): Promise<<%= classify(name) %>ResponseDto> {
  //   const entity = await this.<%= camelize(name) %>DomainService.create(<%= camelize(name) %>.title);
  //   return entity.toDto(<%= classify(name) %>ResponseDto);
  // }

  // async fetch<%= classify(name) %>(<%= camelize(name) %>Id: string): Promise<<%= classify(name) %>ResponseDto> {
  //   const entity = await this.<%= camelize(name) %>DomainService.fetchById(<%= camelize(name) %>Id);
  //   return entity.toDto(<%= classify(name) %>ResponseDto);
  // }

  // async update<%= classify(name) %>(<%= camelize(name) %>Id: string, <%= camelize(name) %>: <%= classify(name) %>RequestDto): Promise<<%= classify(name) %>ResponseDto> {
  //   const entity = await this.<%= camelize(name) %>DomainService.updateById(<%= camelize(name) %>Id, <%= camelize(name) %>.title);
  //   return entity.toDto(<%= classify(name) %>ResponseDto);
  // }

  // async delete<%= classify(name) %>(<%= camelize(name) %>Id: string): Promise<<%= classify(name) %>ResponseDto> {
  //   const entity = await this.<%= camelize(name) %>DomainService.deleteById(<%= camelize(name) %>Id);
  //   return entity.toDto(<%= classify(name) %>ResponseDto);
  // }

}
