import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, 
  IsString, 
  MaxLength, 
  MinLength
} from 'class-validator';

export class <%= classify(name) %>RequestDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public userName: string;

}
