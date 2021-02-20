import { Injectable, BadRequestException } from '@nestjs/common';
import { Metric } from './metric';
import { MetricSumDTO, EmptyDTO } from './dto';

@Injectable()
export class AppService {
  constructor(private readonly metric: Metric) {}

  log(key: string, value: number): EmptyDTO {
    if (value < 0) {
      throw new BadRequestException({
        error: 'value must be a positive number',
      });
    }
    value = Math.round(value);
    this.metric.add(key, value);
    return {};
  }

  sum(key: string): MetricSumDTO {
    return { value: this.metric.sum(key) };
  }
}
