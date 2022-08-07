import { LinearRetryStrategyModule } from '.';
import { Time } from '../../../models/time/time';
import { ExecutorModule } from '../executor';
import { LinearRetryStrategy } from './linear-retry-strategy';
import {
    LinearRetryStrategyAnnotation,
    LinearRetryStrategyAttemptsAnnotation,
    LinearRetryStrategyDelayAnnotation,
} from './linear-retry-strategy-annotations';

describe('Linear Retry Strategy Module Test Suite', () => {
    const module = new LinearRetryStrategyModule();

    beforeAll(() => {
        new ExecutorModule().configure();
        module.configure();
    });

    test('Should resolve the linear retry strategy annotation', () => {
        const strategy = module.resolve(LinearRetryStrategyAnnotation);

        expect(strategy).toBeInstanceOf(LinearRetryStrategy);
    });

    test('Should resolve the linear retry strategy delay annotation', () => {
        const delay = module.resolve(LinearRetryStrategyDelayAnnotation);

        expect(delay).toBeInstanceOf(Time);
    });

    test('Should resolve the linear retry strategy attempts annotation', () => {
        const delay = module.resolve(LinearRetryStrategyAttemptsAnnotation);

        expect(delay).toEqual(5);
    });
});
