import { MessageQueueModule } from '.';
import { MessageQueueIdempotencyModule } from './idempotency';
import { LocalMessageQueueModule } from './local';
import { MetricMessageQueueConnectionStrategyModule } from './metrics';
import { NotificationStrategyModule } from './notification-strategy';
import { RetryStrategyModule } from './retry-strategy';

describe('Message Queue Module Test Suite', () => {
    const module = new MessageQueueModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(MessageQueueIdempotencyModule)).toBeTruthy();
        expect(module.isRegistered(LocalMessageQueueModule)).toBeTruthy();
        expect(
            module.isRegistered(MetricMessageQueueConnectionStrategyModule)
        ).toBeTruthy();
        expect(module.isRegistered(NotificationStrategyModule)).toBeTruthy();
        expect(module.isRegistered(RetryStrategyModule)).toBeTruthy();
    });
});
