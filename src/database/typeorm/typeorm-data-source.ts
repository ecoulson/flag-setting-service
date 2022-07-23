import { Injectable } from 'noose-injection';
import { DataSource as PostgreSQLDataSource, Repository } from 'typeorm';
import { ConnectionString } from '../connection-string/connection-string';
import { PostgresConnectionStringAnnotation } from '../connection-string/connection-string-annotation';
import { DataSource } from '../data-source';
import { DatabaseDebugInfoAnnotation } from '../debug-info/debug-annotation';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { DialectAnnotation } from '../dialect/dialect-annotations';
import { DialectType } from '../dialect/dialect-type';
import { PostgreSQLDataSourceAnnotation } from './typeorm-annotations';
import { DatabaseEntitiesAnnotation } from '../entities/entities-annotations';
import { DatabaseEntities } from '../entities/database-entities';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { Logger } from '../../logging/logger';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';

@Injectable()
export class TypeORMDataSource implements DataSource {
    constructor(
        @PostgreSQLDataSourceAnnotation.inject()
        private readonly dataSource: PostgreSQLDataSource,
        @PostgresConnectionStringAnnotation.inject()
        private readonly connectionString: ConnectionString,
        @DialectAnnotation.inject()
        private readonly dialect: Dialect,
        @DatabaseDebugInfoAnnotation.inject()
        private readonly debugInfo: DatabaseDebugInfo,
        @DatabaseEntitiesAnnotation.inject()
        private readonly entities: DatabaseEntities,
        @LoggerAnnotation.inject()
        private readonly logger: Logger
    ) {}

    async initialize(databaseUrl: EnvironmentVariable): Promise<boolean> {
        const connectionParameters = this.connectionString.parse(databaseUrl);
        if (!connectionParameters.isPresent()) {
            this.logger.error(
                'No connection string is present in the environment. Please set one in your system variables.'
            );
            return false;
        } else if (this.dialect.type() === DialectType.UNKNOWN) {
            this.logger.error(
                'No database dialect has been selected. Please set one in your system environment'
            );
            return false;
        } else {
            await this.dataSource
                .setOptions({
                    type: this.dialect.type() as any, //todo: find better casting type
                    ...connectionParameters.get(),
                    ...this.debugInfo.get(),
                    entities: this.entities.getAll(),
                })
                .initialize();
            this.logger.info('Successfully connected to the database.');
            return true;
        }
    }

    getRepository<T>(entity: { new (...args: any[]): T }): Repository<T> {
        return this.dataSource.getRepository(entity);
    }
}
