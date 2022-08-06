import { MetricMessageQueueConnectionStrategyModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { EventModule } from '../../events';
import IdentifierServiceModule from '../../services/identifier';
import { MetricServiceModule } from '../../services/metrics';
import { StorageModule } from '../../storage';
import { MessageQueueIdempotencyModule } from '../idempotency';
import { LocalMessageQueueModule } from '../local';
import { MetricLocalMessageQueueConnectionStrategyAnnotation } from './connection-strategy-annotation';
import { MetricsLocalConnectionStrategy } from './metrics-local-connection-strategy';

describe('Metric Message Queue Connection Strategy Test Suite', () => {
    const module = new MetricMessageQueueConnectionStrategyModule();

    beforeAll(() => {
        new LocalMessageQueueModule().configure();
        new StorageModule().configure();
        new EventModule().configure();
        new MessageQueueIdempotencyModule().configure();
        new IdentifierServiceModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        new MetricServiceModule().configure();
        module.configure();
    });

    test('Should resolve the local connection strategy', () => {
        const strategy = module.resolve(
            MetricLocalMessageQueueConnectionStrategyAnnotation
        );

        expect(strategy).toBeInstanceOf(MetricsLocalConnectionStrategy);
    });
});
