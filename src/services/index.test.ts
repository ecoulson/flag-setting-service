import { ServiceModule } from '.';
import { EventServiceModule } from './events';
import { FlagServiceModule } from './flags';
import IdentifierServiceModule from './identifier';
import { MessageQueueServiceModule } from './message-queues';
import { MetricServiceModule } from './metrics';

describe('Service Module Test Suite', () => {
    const module = new ServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(FlagServiceModule)).toBeTruthy();
        expect(module.isRegistered(EventServiceModule)).toBeTruthy();
        expect(module.isRegistered(IdentifierServiceModule)).toBeTruthy();
        expect(module.isRegistered(MessageQueueServiceModule)).toBeTruthy();
        expect(module.isRegistered(MetricServiceModule)).toBeTruthy();
    });
});
