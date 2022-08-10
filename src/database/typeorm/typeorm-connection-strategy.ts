import { Status } from '../../common/status/status';
import { ConnectionStrategy } from '../../connections/connection-strategy/connection-strategy';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { Logger } from '../../logging/logger';
import { DataSource } from '../data-source';

export abstract class TypeORMConnectionStrategy implements ConnectionStrategy {
    constructor(
        private readonly dataSource: DataSource,
        private readonly databaseUrl: EnvironmentVariable,
        private readonly logger: Logger
    ) {}

    async initialize(): Promise<Status> {
        const initializationStatus = await this.dataSource.initialize(
            this.databaseUrl
        );
        if (!initializationStatus.ok()) {
            this.logger.fatal(
                'Failed to initialize connection with data source'
            );
        } else {
            this.logger.info('Successfully connected to the data source');
        }
        return initializationStatus;
    }
}
