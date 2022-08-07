import { ExecutorModule } from '.';
import { ScheduledExecutorAnnotation } from './executor-annotation';
import { ScheduledExecutor } from './scheduled-executor';

describe('Executor Module Test Suite', () => {
    const executorModule = new ExecutorModule();

    beforeAll(() => {
        executorModule.configure();
    });

    test('Should resolve the scheduled executor annotation', () => {
        const executor = executorModule.resolve(ScheduledExecutorAnnotation);

        expect(executor).toBeInstanceOf(ScheduledExecutor);
    });
});
