import { DataSource as TypeORMDataSouceInstance } from 'typeorm';
import { ConnectionString } from '../connection-string/connection-string';
import { DataSource } from '../data-source';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { Dialect } from '../dialect/dialect';
import { DialectType } from '../dialect/dialect-type';
import { DatabaseEntities } from '../entities/database-entities';
import { Logger } from '../../logging/logger';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { TypeORMDataSourceFactory } from './typeorm-data-source-factory';
import { Optional } from '../../common/optional/optional';
import { ConnectionParameters } from '/Users/evancoulson/Code/flag-setting/src/database/connection-string/connection-parameters';
import { DebugStringBuilder } from '../../common/debug/debug-string-builder';
import { EntityConstructor } from '../entities/entity-constructor';
import { Broker } from '../broker/broker';
import { TypeORMBroker } from './typeorm-broker';
import { Identifiable } from '../../models/identifiable';

export class TypeORMDataSource implements DataSource {
    private readonly dataSource: TypeORMDataSouceInstance;

    constructor(
        dataSourceFactory: TypeORMDataSourceFactory,
        private readonly connectionString: ConnectionString,
        private readonly dialect: Dialect,
        private readonly debugInfo: DatabaseDebugInfo,
        private readonly entities: DatabaseEntities,
        private readonly logger: Logger
    ) {
        this.dataSource = dataSourceFactory.buildPostgresDatabase();
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
                return this.handleConnectionFailure(
                    error as Error,
                    type,
                    connectionParameters
                );
            }
        }
    }

    private async connect(
        type: DialectType,
        connectionParameters: Optional<ConnectionParameters>
    ) {
        await this.dataSource
            .setOptions({
                type: type as any,
                ...connectionParameters.get(),
                ...this.debugInfo.get(),
                entities: this.entities.getAll(),
            })
            .initialize();
        this.logger.info(
            `Successfully connected to the database: ${
                connectionParameters.get().database
            }`
        );
        return true;
    }

    private handleConnectionFailure(
        error: Error,
        type: DialectType,
        connectionParameters: Optional<ConnectionParameters>
    ) {
        const connectionParametersDebugString = new DebugStringBuilder()
            .setObject(connectionParameters.get())
            .build();
        const errorDebugString = new DebugStringBuilder()
            .setObject(error)
            .build();
        this.logger.error(errorDebugString);
        this.logger.error(
            `Failed to initialize connection for the connection parameters ${connectionParametersDebugString} with ${type} dialect`
        );
        return false;
    }

    getRepository<T extends Identifiable>(
        entity: EntityConstructor
    ): Optional<Broker<T>> {
        if (!this.entities.hasEntity(entity)) {
            return Optional.empty();
        }
        return Optional.of(
            TypeORMBroker.fromRepository<T>(
                this.dataSource.getRepository(entity)
            )
        );
    }
}
