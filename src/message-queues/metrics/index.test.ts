import { MetricMessageQueueConnectionStrategyModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { EventModule } from '../../events';
import { IdentifierModule } from '../../identifiers';
import { MetricServiceModule } from '../../services/metrics';
import { StorageModule } from '../../storage';
import { MessageQueueIdempotencyModule } from '../idempotency';
import { LocalMessageQueueModule } from '../local';
import { MetricLocalMessageQueueConnectionStrategyAnnotation } from './connection-strategy-annotation';
import { MetricsLocalConnectionStrategy } from './metrics-local-connection-strategy';
import { RetryStrategyModule } from '../retry-strategy';

describe('Metric Message Queue Connection Strategy Test Suite', () => {
    const module = new MetricMessageQueueConnectionStrategyModule();

    beforeAll(() => {
        new LocalMessageQueueModule().configure();
        new StorageModule().configure();
        new EventModule().configure();
        new MessageQueueIdempotencyModule().configure();
        new IdentifierModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new MetricServiceModule().configure();
        new RetryStrategyModule().configure();
        module.configure();
    });

    test('Should resolve the local connection strategy', () => {
        const strategy = module.resolve(
            MetricLocalMessageQueueConnectionStrategyAnnotation
        );

        expect(strategy).toBeInstanceOf(MetricsLocalConnectionStrategy);
    });
});
