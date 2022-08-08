import { NotificationStrategyModule } from '.';
import { ConnectionModule } from '../../connections';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { EventModule } from '../../events';
import { IdentifierModule } from '../../identifiers';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { StorageModule } from '../../storage';
import { MessageQueueIdempotencyModule } from '../idempotency';
import { LocalNotificationStrategy } from './local-notification-strategy';
import { LocalNotificationStrategyAnnotation } from './notification-strategy-annotation';

describe('Notification Strategy Module Test Suite', () => {
    const module = new NotificationStrategyModule();

    beforeAll(() => {
        new StorageModule().configure();
        new EventModule().configure();
        new IdentifierModule().configure();
        new MessageQueueIdempotencyModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new ConnectionModule().configure();
        module.configure();
    });

    test('Should resolve the local notification strategy annotation', () => {
        const strategy = module.resolve(LocalNotificationStrategyAnnotation);

        expect(strategy).toBeInstanceOf(LocalNotificationStrategy);
    });
});
