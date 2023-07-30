import { Controller, Get } from '@nestjs/common';
// import { <%= classify(name) %>Service } from 'src/common';

@Controller(<%= `'${dasherize(name)}'` %>)
export class <%= classify(name) %>Controller {

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
