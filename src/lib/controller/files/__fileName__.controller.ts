import { Controller, Get } from '@nestjs/common';
// import { <%= classify(name) %>Service } from 'src/common';

@Controller(<%= `'${dasherize(name)}'` %>)
export class <%= classify(name) %>Controller {

  // This is a controller sample that can be used with Guards, Swagger, Services, etc.
  // You can put your endpoints here.
  // REMEMBER: Controllers should primarily route requests to the appropriate services.
  // They should not contain business logic. That's the responsibility of services and CQRS handlers.

  constructor(
    /* private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service, */
  ) {}

  @Get('/')
  async index(): Promise<Record<string, string>> {
    return {
      id: '9fccd5d0-2a6e-4cce-a1d5-8c0477539ea7',
      name: 'Mimo Shorts',
    }
  }

}
