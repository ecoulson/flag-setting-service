import { LocalMessageQueueServiceModule } from '.';
import { EventServiceModule } from '../../events';
import IdentifierServiceModule from '../../identifier';
import { LocalMessageQueueAnnotation } from './local-message-queue-annotations';

describe('Local Message Queue Module Test Suite', () => {
    const module = new LocalMessageQueueServiceModule();

    beforeAll(() => {
        new EventServiceModule().configure();
        new IdentifierServiceModule().configure();
        module.configure();
    });

    test('Should resolve the local message queue service annotation', () => {
        const service = module.resolve(LocalMessageQueueAnnotation);

        expect(service).not.toBeNull();
    });
});
