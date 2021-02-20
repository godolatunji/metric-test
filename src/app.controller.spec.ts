import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricSumDTO } from './dto';
import { Metric } from './metric';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let metric: Metric;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, Metric],
    }).compile();

    appController = app.get<AppController>(AppController);
    metric = app.get<Metric>(Metric);
  });

  afterAll(() => {
    metric.clear();
  });

  describe('', () => {
    it('should return empty object"', () => {
      const body = { value: 10 };
      const resp = appController.addMetric('key1', body);
      expect(resp).toMatchObject({});
    });

    it('should return return 10"', () => {
      const resp: MetricSumDTO = appController.sumMetric('key1');
      expect(resp).toHaveProperty('value');
      expect(resp.value).toBe(10);
    });

    it('should round number to the nearest integer', () => {
      const body = { value: 10.7 };
      appController.addMetric('key1', body);
      const resp: MetricSumDTO = appController.sumMetric('key1');
      expect(resp.value).toBe(21);
    });

    it('should fail for negative number', () => {
      const body = { value: -1 };
      expect(() => {
        appController.addMetric('key1', body);
      }).toThrow(BadRequestException);
    });
  });
});
