import { FastifyServerAnnotation } from './server/server-annotations';
import { FlagConnectionStrategyAnnotation } from './database/flags/flag-database-annotations';
import { MessageConnectionStrategyAnnotation } from './database/messages/message-database-annotations';
import { ConnectionStrategy } from './connections/connection-strategy/connection-strategy';
import { MetricMessageQueueConnectionStrategyAnnotation } from './message-queues/connection-strategy/message-queue-connection-strategy-annotation';
import { MetricConnectionStrategyAnnotation } from './database/metrics/metric-data-source-annotations';
import { Status } from './common/status/status';
import { Injectable } from 'noose-injection';
import { Server } from './server/server';

@Injectable()
export class App {
    constructor(
        @FastifyServerAnnotation.inject()
        private readonly server: Server,
        @FlagConnectionStrategyAnnotation.inject()
        private readonly flagConnectionStrategy: ConnectionStrategy,
        @MessageConnectionStrategyAnnotation.inject()
        private readonly messageConnectionStrategy: ConnectionStrategy,
        @MetricConnectionStrategyAnnotation.inject()
        private readonly metricConnectionStrategy: ConnectionStrategy,
        @MetricMessageQueueConnectionStrategyAnnotation.inject()
        private readonly metricMessageQueueConnectionStrategy: ConnectionStrategy
    ) {}

    async start(): Promise<Status> {
        await Promise.all([
            this.flagConnectionStrategy.initialize(),
            this.messageConnectionStrategy.initialize(),
            this.metricConnectionStrategy.initialize(),
            this.metricMessageQueueConnectionStrategy.initialize(),
            this.server.listen(8080),
        ]);
        return Status.ok();
    }
}
