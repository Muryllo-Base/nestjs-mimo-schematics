import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, 
  IsString, 
  MaxLength, 
  MinLength
} from 'class-validator';

export class <%= classify(name) %>RequestDto {

  // Request DTOs should validate the input of the user and
  // ensure the correctly format of data received in back-end.
  // REMEMBER: Request DTOs doesnt need to know about Entities, 
  // Services or Business logic, their main goal is validate 
  // the input data, not process the received data.

  @ApiProperty() // <-- Dont forget to use @ApiProperty to ensure Swagger Docs to work properly
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public foo: string;

  @ApiProperty() // <-- Dont forget to use @ApiProperty to ensure Swagger Docs to work properly
  @IsString()
  @IsNotEmpty()
  public bar: string;

}
