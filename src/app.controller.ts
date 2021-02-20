import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AddMetricDTO, EmptyDTO, MetricSumDTO } from './dto';

@ApiTags('Metric')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  index() {
    return 'Welcome to Metric Test, Documentation can be should at /docs';
  }

  @Post('/metric/:key')
  @ApiCreatedResponse({
    type: EmptyDTO,
  })
  addMetric(@Param('key') key: string, @Body() body: AddMetricDTO): EmptyDTO {
    return this.appService.log(key, body.value);
  }

  @Get('/metric/:key/sum')
  @ApiCreatedResponse({
    type: MetricSumDTO,
  })
  sumMetric(@Param('key') key: string): MetricSumDTO {
    return this.appService.sum(key);
  }
}
