import { Injectable } from 'noose-injection';
import { DataSource as TypeORMDataSouceInstance, Repository } from 'typeorm';
import { ConnectionString } from '../connection-string/connection-string';
import { PostgresConnectionStringAnnotation } from '../connection-string/connection-string-annotation';
import { DataSource } from '../data-source';
import { DatabaseDebugInfoAnnotation } from '../debug-info/debug-annotation';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { DialectAnnotation } from '../dialect/dialect-annotations';
import { DialectType } from '../dialect/dialect-type';
import { DataSourceFactoryAnnotation } from './typeorm-annotations';
import { DatabaseEntitiesAnnotation } from '../entities/entities-annotations';
import { DatabaseEntities } from '../entities/database-entities';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { Logger } from '../../logging/logger';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { DataSourceFactory } from './data-source-factory';
import { Optional } from '../../common/optional/optional';
import { ConnectionParameters } from '/Users/evancoulson/Code/flag-setting/src/database/connection-string/connection-parameters';

@Injectable()
export class TypeORMDataSource implements DataSource {
    private typeORMDataSource: TypeORMDataSouceInstance;

    constructor(
        @DataSourceFactoryAnnotation.inject()
        dataSourceFactory: DataSourceFactory,
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
    ) {
        this.typeORMDataSource = dataSourceFactory.buildPostgresDatabase();
    }

    async initialize(databaseUrl: EnvironmentVariable): Promise<boolean> {
        const connectionParameters = this.connectionString.parse(databaseUrl);
        const type = this.dialect.type();
        if (!connectionParameters.isPresent()) {
            this.logger.error(
                'No connection string is present in the environment. Please set one in your system variables.'
            );
            return false;
        } else if (type === DialectType.UNKNOWN) {
            this.logger.error(
                'No database dialect has been selected. Please set one in your system environment'
            );
            return false;
        } else {
            try {
                return await this.connect(type, connectionParameters);
            } catch (error) {
                return this.handleConnectionFailure(type, connectionParameters);
            }
        }
    }

    private async connect(
        type: DialectType,
        connectionParameters: Optional<ConnectionParameters>
    ) {
        await this.typeORMDataSource
            .setOptions({
                type: type as any,
                ...connectionParameters.get(),
                ...this.debugInfo.get(),
                entities: this.entities.getAll(),
            })
            .initialize();
        this.logger.info('Successfully connected to the database.');
        return true;
    }

    private handleConnectionFailure(
        type: DialectType,
        connectionParameters: Optional<ConnectionParameters>
    ) {
        this.logger.error(
            `Failed to initialize connection for ${type} dialect for the connection parameters\n ${JSON.stringify(
                connectionParameters.get(),
                null,
                4
            )}`
        );
        return false;
    }

    getRepository<T>(entity: { new (...args: any[]): T }): Repository<T> {
        return this.typeORMDataSource.getRepository(entity);
    }
}
