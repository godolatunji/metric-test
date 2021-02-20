import { Injectable } from '@nestjs/common';

@Injectable()
export class Metric {
  private readonly logger: Map<string, LogUnit[]> = new Map();

  add(key: string, value: number): void {
    const input: LogUnit = { value, timeStamp: new Date().getTime() };
    let keyArray: LogUnit[] = Array(0);
    // if key does not exist, create new array and add to key index
    if (!this.logger.has(key)) {
      keyArray.unshift(input);
    } else {
      keyArray = this.logger.get(key);
      keyArray.unshift(input);
    }
    this.logger.set(key, keyArray);
  }

  sum(key: string): number {
    const keyArray: LogUnit[] = this.logger.get(key);
    // if key has not been logged, return 0
    if (!keyArray || keyArray.length === 0) {
      return 0;
    }

    const sum = keyArray.reduce((total, currentValue) => {
      const currentTimeStamp = currentValue.timeStamp;
      if (this.isOverAnHour(currentTimeStamp)) {
        return 0;
      } else {
        total += currentValue.value;
        return total;
      }
    }, 0);

    return sum;
  }

  isOverAnHour(timeStamp: number): boolean {
    const currentTimeStamp = new Date().getTime();
    return currentTimeStamp - timeStamp > 3600000 ? true : false;
  }

  // this garbage collection function is to remove stale log units
  gc(): void {
    setTimeout(() => {
      this.job(this.logger);
    }, 3600000);
  }

  job(logger: Map<string, LogUnit[]>): void {
    for (const key of logger.keys()) {
      const keyArray = logger.get(key);
      for (let i = keyArray.length - 1; i >= 0; i--) {
        const currenValue = keyArray[i];
        if (this.isOverAnHour(currenValue.timeStamp)) {
          keyArray.splice(i, 1);
        }
      }
    }
  }

  clear(): void {
    this.logger.clear();
  }
}

type LogUnit = {
  value: number;
  timeStamp: number;
};
