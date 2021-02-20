import { Test, TestingModule } from '@nestjs/testing';
import { Metric } from './metric';

jest.useFakeTimers('modern');

describe('Metric Tests', () => {
  let metric: Metric;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [Metric],
    }).compile();

    metric = app.get<Metric>(Metric);
  });

  afterAll(() => {
    metric.clear();
  });

  describe('', () => {
    it('should return sum of a key', () => {
      metric.add('key2', 10);
      metric.add('key2', 10);
      const sum = metric.sum('key2');
      expect(sum).toEqual(20);
    });

    it('should return sum of another key', () => {
      metric.add('key3', 10);
      metric.add('key3', 10);
      const sum = metric.sum('key3');
      expect(sum).toEqual(20);
    });

    it('should return 0 as sum for key that does not exist', () => {
      const sum = metric.sum('key4');
      expect(sum).toEqual(0);
    });

    it('should return 0 after logger is cleared', () => {
      metric.add('key3', 10);
      metric.clear();
      const sum = metric.sum('key3');
      expect(sum).toEqual(0);
    });

    /**
     * Currently having trouble mocking the setTimeout in gc()
     * Will revisit
     */
    it.skip('should ignore metrics over 1 hour', () => {
      metric.add('key5', 10);
      metric.add('key5', 10);

      metric.gc();
      jest.advanceTimersByTime(3600000);
      jest.clearAllTimers();
      metric.add('key5', 10);

      const sum = metric.sum('key5');
      expect(sum).toEqual(10);
    });
  });
});
