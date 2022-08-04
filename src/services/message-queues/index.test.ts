import { MessageQueueServiceModule } from '.';
import { MessageIdempotencyServiceModule } from './idempotency';
import { LocalMessageQueueServiceModule } from './local';

describe('Message Queue Module Test Suite', () => {
    const module = new MessageQueueServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(
            module.isRegistered(MessageIdempotencyServiceModule)
        ).toBeTruthy();
        expect(
            module.isRegistered(LocalMessageQueueServiceModule)
        ).toBeTruthy();
    });
});
