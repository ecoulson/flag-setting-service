import { DeadLetterQueueModule } from '.';
import { ConnectionModule } from '../../connections';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { StorageModule } from '../../storage';
import { DeadLetterQueueAnnotation } from './dead-letter-queue-annotation';
import { LocalDeadLetterQueue } from './local-dead-letter-queue';

describe('Local Dead Letter Queue Module Test Suite', () => {
    const module = new DeadLetterQueueModule();

    beforeAll(() => {
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new StorageModule().configure();
        new LoggingModule().configure();
        new ModelModule().configure();
        new ConnectionModule().configure();
        module.configure();
    });

    test('Should resolve the local dead letter queue module', () => {
        const queue = module.resolve(DeadLetterQueueAnnotation);

        expect(queue).toBeInstanceOf(LocalDeadLetterQueue);
    });
});
