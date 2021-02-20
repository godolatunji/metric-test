import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class AddMetricDTO {
  @ApiProperty({
    description: 'The value of the key',
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive()
  value: number;
}

export class EmptyDTO {}

export class MetricSumDTO {
  @ApiProperty({
    description: 'The sum of the key in the last 1 hour',
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive()
  value: number;
}
