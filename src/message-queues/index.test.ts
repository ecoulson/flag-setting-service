import { MessageQueueModule } from '.';
import { MessageQueueIdempotencyModule } from './idempotency';
import { LocalMessageQueueModule } from './local';
import { MetricMessageQueueConnectionStrategyModule } from './metrics';

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
    });
});
