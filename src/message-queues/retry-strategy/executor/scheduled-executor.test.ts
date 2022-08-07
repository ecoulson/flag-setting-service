import { Status } from '../../../common/status/status';
import { Time } from '../../../models/time/time';
import { TimeUnit } from '../../../models/time/time-unit';
import { ScheduledExecutor } from './scheduled-executor';

describe('Scheduled Executor Test Suite', () => {
    const executor = new ScheduledExecutor();

    test('Should successfully execute function after 100ms', async () => {
        const handler = jest.fn(() => Promise.resolve(Status.ok()));

        const status = await executor.executeAfter(
            handler,
            new Time(100, TimeUnit.Miliseconds)
        );

        expect(status.ok()).toBeTruthy();
    });

    test('Should successfully execute function after 100ms', async () => {
        const handler = jest.fn(() => Promise.resolve(Status.error()));

        const status = await executor.executeAfter(
            handler,
            new Time(100, TimeUnit.Miliseconds)
        );

        expect(status.ok()).toBeFalsy();
    });

    test('Should fail to execute function after 100ms', async () => {
        const handler = jest.fn(() => {
            throw new Error();
        });

        const status = await executor.executeAfter(
            handler,
            new Time(100, TimeUnit.Miliseconds)
        );

        expect(status.ok()).toBeFalsy();
    });
});
