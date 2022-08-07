import { RetryStrategyModule } from '.';
import { ExecutorModule } from './executor';
import { LinearRetryStrategyModule } from './linear';

describe('Retry Strategy Module Test Suite', () => {
    const module = new RetryStrategyModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should have expected modules registered', () => {
        expect(module.isRegistered(ExecutorModule)).toBeTruthy();
        expect(module.isRegistered(LinearRetryStrategyModule)).toBeTruthy();
    });
});
