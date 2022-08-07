import {
    anyFunction,
    anyOfClass,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Status } from '../../../common/status/status';
import { Time } from '../../../models/time/time';
import { TimeUnit } from '../../../models/time/time-unit';
import { ScheduledExecutor } from '../executor/scheduled-executor';
import { LinearRetryStrategy } from './linear-retry-strategy';

describe('Linear Retry Strategy Test Suite', () => {
    const mockedExecutor = mock(ScheduledExecutor);
    const delay = new Time(100, TimeUnit.Miliseconds);
    const attempts = 5;
    const retryStrategy = new LinearRetryStrategy(
        instance(mockedExecutor),
        delay,
        attempts
    );

    beforeEach(() => {
        reset(mockedExecutor);
    });

    test('Should retry delivering the message 5 times over a linear spacing time', async () => {
        const handler = jest.fn();
        when(mockedExecutor.executeAfter(anyFunction(), delay)).thenResolve(
            Status.error()
        );

        const result = await retryStrategy.execute(handler);

        expect(result.ok()).toBeFalsy();
        verify(mockedExecutor.executeAfter(anyFunction(), delay)).times(5);
    });

    test('Should retry delivering the message 2 times and succeed the third', async () => {
        const handler = jest.fn();
        when(mockedExecutor.executeAfter(anyFunction(), delay)).thenResolve(
            Status.error(),
            Status.error(),
            Status.ok()
        );

        const result = await retryStrategy.execute(handler);

        expect(result.ok()).toBeTruthy();
        verify(mockedExecutor.executeAfter(anyFunction(), delay)).times(3);
    });
});
