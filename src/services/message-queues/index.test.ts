import { MessageQueueServiceModule } from '.';
import { LocalMessageQueueAnnotation } from './message-queue-annotations';

describe('Message Queue Module Test Suite', () => {
    const module = new MessageQueueServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve the local message queue service annotation', () => {
        const service = module.resolve(LocalMessageQueueAnnotation);

        expect(service).not.toBeNull();
    });
});
