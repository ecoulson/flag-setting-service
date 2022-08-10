import { MessageQueueConnectionStrategyModule } from '.';
import { ConnectionModule } from '../../connections';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { EventEmitterModule } from '../../events/emitter';
import { IdentifierModule } from '../../identifiers';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ServiceModule } from '../../services';
import { StorageModule } from '../../storage';
import { MessageQueueIdempotencyModule } from '../idempotency';
import { LocalMessageQueueModule } from '../local';
import { MetricsLocalConnectionStrategy } from '../metrics/metrics-local-connection-strategy';
import { NotificationStrategyModule } from '../notification-strategy';
import { RetryStrategyModule } from '../retry-strategy';
import { MetricMessageQueueConnectionStrategyAnnotation } from './message-queue-connection-strategy-annotation';

describe('Message Queue Connection Strategy Module', () => {
    const module = new MessageQueueConnectionStrategyModule();

    beforeAll(() => {
        new LocalMessageQueueModule().configure();
        new EventEmitterModule().configure();
        new IdentifierModule().configure();
        new MessageQueueIdempotencyModule().configure();
        new ConnectionModule().configure();
        new StorageModule().configure();
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new RetryStrategyModule().configure();
        new NotificationStrategyModule().configure();
        new ServiceModule().configure();
        module.configure();
    });

    test('Should resolve the message queue connection strategy annotation', () => {
        const strategy = module.resolve(
            MetricMessageQueueConnectionStrategyAnnotation
        );

        expect(strategy).toBeInstanceOf(MetricsLocalConnectionStrategy);
    });
});
